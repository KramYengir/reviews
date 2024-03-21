import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Review from "../components/Review";

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
    <Review
      rating={data.review.data.attributes.rating}
      title={data.review.data.attributes.title}
      categories={data.review.data.attributes.categories.data}
      body={data.review.data.attributes.body[0].children}
    />
  );
};

export default ReviewDetails;
