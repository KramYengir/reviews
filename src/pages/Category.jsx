import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
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

const Category = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  console.log(data);

  return (
    <>
      <h2>{data.category.data.attributes.name}</h2>
      {data.category.data.attributes.reviews.data &&
        data.category.data.attributes.reviews.data.map((review) => (
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>
            {review.attributes.categories.data.map((category) => (
              <small key={category.id}>{category.attributes.name}</small>
            ))}
            <p>
              {review.attributes.body[0].children.map((child) =>
                child.text.substring(0, 200)
              )}
              ...
            </p>
            <Link to={`/review/${review.id}`}>Read More</Link>
          </div>
        ))}
    </>
  );
};

export default Category;
