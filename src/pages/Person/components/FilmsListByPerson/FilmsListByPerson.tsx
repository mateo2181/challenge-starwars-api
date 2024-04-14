import { useEffect, useState } from 'react';
import { useQuery } from "urql";
import { graphql } from '@/generated/gql';
import { Planet } from '@/generated/graphql';
import Loading from '@/components/UI/Loading/Loading';
import styles from './FilmsListByPerson.module.scss';

const query = graphql(`
  query PersonWithFilm($id: ID, $first: Int, $last: Int, $after: String, $before: String) {
    person(id: $id) {
      filmConnection(first: $first, last: $last, after: $after, before: $before) {
        films {
          id
          title
          releaseDate
          planetConnection {
            planets {
              surfaceWater
            }
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`);

type Props = {
  personId: string
}

type QueryVariables = {
  id: string;
  first: number | null;
  last: number | null;
  after: string;
  before: string;
}
const FilmsListByPerson = ({ personId }: Props) => {

  const [variables, setVariables] = useState<QueryVariables>({ id: personId, first: 1, last: null, after: "", before: "" });
  /*
    The offset variable will be used instead of hasNextPage and hasPreviousPage because:
     - API always returns hasPreviousPage: false when the variables used are `first` and `after` and
     - API always returns hasNextPage: false when the variables used are `last` and `before`.
    Variables are being used depending if the button clicked is Previous or Next and we use offset to enable/disable the pagination buttons.
    Details: https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo.Fields
  */
  const [offset, setOffset] = useState<number>(0);
  const [planetsWithoutWater, setPlanetsWithoutWater] = useState<Array<Planet>>([]);

  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  const film = data?.person?.filmConnection?.films && data?.person?.filmConnection?.films?.length > 0 ? data.person.filmConnection.films[0] : null;
  const totalFilms = data?.person?.filmConnection?.totalCount || 0;

  useEffect(() => {
    if (film?.planetConnection?.planets && film.planetConnection.planets.length > 0) {
      const planetsFiltered = film.planetConnection.planets.filter(planet => !planet?.surfaceWater);
      setPlanetsWithoutWater(planetsFiltered as Array<Planet>);
    } else {
      setPlanetsWithoutWater([]);
    }
  }, [film])

  const paginationData = data?.person?.filmConnection?.pageInfo;

  const previousPage = (cursor: string) => {
    setVariables(prev => ({ ...prev, first: null, last: 1, after: '', before: cursor }));
    setOffset(prev => prev - 1);
  }

  const nextPage = (cursor: string) => {
    setVariables(prev => ({ ...prev, first: 1, last: null, after: cursor, before: '' }));
    setOffset(prev => prev + 1);
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Films</h2>
      {error && <p>Unexpected error: {error.message}</p>}
      {fetching ?
        <Loading />
        :
        film ?
          <>
            <div className={styles.film}>
              <h3 className={styles.filmTitle}>{film.title}</h3>
              <p>Release Date: <strong>{film.releaseDate}</strong></p>
              <p>Number of planets without water: <strong>{planetsWithoutWater.length}</strong></p>
            </div>
            <div className={styles.pagination}>
              <button disabled={!offset} onClick={() => previousPage(paginationData?.endCursor || '')}>Previous</button>
              <button disabled={totalFilms - 1 === offset} onClick={() => nextPage(paginationData?.endCursor || '')}>Next</button>
            </div>
          </>
          :
          <p>Film not found.</p>
      }

    </div>
  )
}

export default FilmsListByPerson;