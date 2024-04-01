import { useQuery, gql } from "@apollo/client";
import Review from "../components/Review/Review";
import { useFilter } from "../context/FilterContext";

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

const REVIEWS_BY_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
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
      }
    }
  }
`;

const Homepage = () => {
  const { activeFilter } = useFilter();

  const { loading, error, data } = useQuery(
    activeFilter ? REVIEWS_BY_CATEGORY : REVIEWS,
    {
      variables: activeFilter ? { id: activeFilter } : {},
    }
  );

  console.log(activeFilter);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const reviewsData = activeFilter
    ? data.category.data.attributes.reviews.data
    : data.reviews.data;

  return (
    <main>
      {reviewsData.map((review) => (
        <Review
          key={review.id}
          rating={review.attributes.rating}
          title={review.attributes.title}
          categories={review.attributes.categories.data}
          body={review.attributes.body}
          link={review.id}
        />
      ))}
    </main>
  );
};

export default Homepage;
