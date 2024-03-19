import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
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

const ReviewDetails = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(REVIEW, {
    variables: {
      id: id,
    },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  return (
    <article className="review-card">
      <div className="rating">{data.review.data.attributes.rating}</div>
      <h2>{data.review.data.attributes.title}</h2>
      {data.review.data.attributes.categories.data.map((category) => (
        <small key={category.id}>{category.attributes.name}</small>
      ))}
      <p>
        {data.review.data.attributes.body[0].children.map(
          (child) => child.text
        )}
      </p>
    </article>
  );
};

export default ReviewDetails;
