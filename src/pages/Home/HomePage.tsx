import { Link } from 'react-router-dom';
import { useQuery } from "urql";
import { graphql } from '@/generated/gql';
import Container from '@/components/UI/Container/Container';
import styles from './HomePage.module.scss';
import Loading from '@/components/UI/Loading/Loading';

const query = graphql(`
  query Home {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

const HomePage = () => {
  const [result] = useQuery({ query });

  const { data, fetching, error } = result;

  const people = data?.allPeople?.edges;

  return (
    <Container>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>People</h2>

        {fetching && <Loading />}
        {error && <p>Unexpected error: {error.message}</p>}

        <div className={styles.list}>
          {people?.map((person) => (
            <Link to={`/person/${person?.node?.id}`} className={styles.card} key={person?.node?.id}>
              <span> {person?.node?.name} </span>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
};

export default HomePage;
