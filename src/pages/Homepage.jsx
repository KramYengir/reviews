import { useQuery, gql } from "@apollo/client";
import Review from "../components/Review/Review";
import { useFilter } from "../context/FilterContext";

const localURL = "http://localhost:1337";
const prodURL = "https://reviews-app-5fdae.ondigitalocean.app";

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
          image {
            data {
              attributes {
                formats
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
                image {
                  data {
                    attributes {
                      formats
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const reviewsData = activeFilter
    ? data.category.data.attributes.reviews.data
    : data.reviews.data;

  const imageBimage =
    "http://localhost:1337" +
    reviewsData[0].attributes.image.data.attributes.formats.small.url;

  console.log(imageBimage);

  return (
    <main>
      {reviewsData.map((review) => (
        <Review
          key={review.id}
          rating={review.attributes.rating}
          title={review.attributes.title}
          category={review.attributes.categories.data[0].attributes.name}
          body={review.attributes.body}
          image={
            prodURL + review.attributes.image.data.attributes.formats.small.url
          }
          linkURL={`/review/${review.id}`}
          linkText={"Read More"}
          isShort={true}
        />
      ))}
    </main>
  );
};

export default Homepage;
