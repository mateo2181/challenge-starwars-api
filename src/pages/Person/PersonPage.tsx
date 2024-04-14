import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "urql";
import { graphql } from '@/generated/gql';
import Container from '@/components/UI/Container/Container';
import FilmsListByPerson from "./components/FilmsListByPerson/FilmsListByPerson";
import styles from './PersonPage.module.scss';
import Loading from "@/components/UI/Loading/Loading";

const query = graphql(`
  query Person($id: ID) {
    person(id: $id) {
      id,
      name,
      birthYear,
      species {
        averageHeight
      },
      filmConnection {
        films {
          producers
        }
        totalCount
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`);

const PersonPage = () => {

  let { personId } = useParams();

  const [result] = useQuery({ query, variables: { id: personId } });
  const { data, fetching, error } = result;
  const person = data?.person;

  /*
    Producers are calculated assuming all the films are returned on the call (I have checked it and that is the case considering that
    hasNextPage is false for all the persons).
    An alternative approach will be using the totalCount (that we are returning on the query) in the "first" parameter
    of filmConnection, that will require another call but will be returning the full list of films of this person.
  */
  const [producers, setProducers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const producersList: { [key: string]: number } = {};
    if (person?.filmConnection?.films) {
      person?.filmConnection?.films.forEach((f: any) => {
        f.producers.forEach((producer: string) => {
          producersList[producer] = (producersList[producer] || 0) + 1;
        });
      });
    }
    setProducers(producersList);
  }, [person?.filmConnection]);


  return (
    <Container>
      <div className={styles.wrapper}>
        {error && <p>Unexpected error: {error.message}</p>}
        {fetching && <Loading />}

        {
          person &&
          <>
            <div className={styles.header}>
              <Link to="/" className={styles.buttonBack}>
                &#8592; Back
              </Link>
              <h2 className={styles.title}> {person.name} </h2>
            </div>
            {person.species?.averageHeight ?
              <p>Species Average Height: <strong> {person.species.averageHeight} </strong></p>
              :
              <p>No species found.</p>
            }

            <p>Birth Year: <strong> {person.birthYear} </strong></p>

            {producers &&
              <div className={styles.producers}>
                List of producers he has worked with:
                <ul>
                  {Object.keys(producers).map((key, index) => (
                    <li key={index}> <strong> {key} </strong>: {producers[key]} times.</li>
                  ))}
                </ul>
              </div>
            }
            <div className={styles.films}>
              <FilmsListByPerson personId={personId || ''} />
            </div>
          </>
        }
      </div>
    </Container>
  )
};

export default PersonPage;
