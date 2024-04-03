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
  const { activeFilter, setActiveFilter } = useFilter();

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

  console.log("ActiveFilter: ", activeFilter);

  return (
    <main className="container">
      <div className="filter">
        {/* <span>Filter reviews by category: </span> */}
        <a
          onClick={() => setActiveFilter(null)}
          className={!activeFilter ? "active" : ""}
        >
          All
        </a>
        <a
          onClick={() => setActiveFilter(2)}
          className={!activeFilter ? "active" : ""}
        >
          Film
        </a>
        <a
          onClick={() => setActiveFilter(3)}
          className={!activeFilter ? "active" : ""}
        >
          Tv
        </a>
      </div>
      {reviewsData.map((review) => (
        <Review
          key={review.id}
          rating={review.attributes.rating}
          title={review.attributes.title}
          category={review.attributes.categories.data[0].attributes.name}
          body={review.attributes.body}
          image={
            localURL + review.attributes.image.data.attributes.formats.small.url
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
