import { useQuery, gql } from "@apollo/client";
import Review from "../components/Review";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const Homepage = () => {
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  console.log(data);

  return (
    <main>
      {data.reviews.data &&
        data.reviews.data.map((review) => (
          <Review
            key={review.id}
            rating={review.attributes.rating}
            title={review.attributes.title}
            categories={review.attributes.categories.data}
            body={review.attributes.body[0].children}
            link={review.id}
          />
        ))}
    </main>
  );
};

export default Homepage;
