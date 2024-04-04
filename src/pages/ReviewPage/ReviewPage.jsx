import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Review from "../../components/Review/Review";
import "./ReviewPage.css";

const localURL = "http://localhost:1337";
const prodURL = "https://reviews-app-5fdae.ondigitalocean.app";

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

const ReviewPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(REVIEW, {
    variables: {
      id: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  return (
    <div className="review-page">
      <Review
        rating={data.review.data.attributes.rating}
        title={data.review.data.attributes.title}
        category={
          data.review.data.attributes.categories.data[0].attributes.name
        }
        body={data.review.data.attributes.body}
        image={
          localURL +
          data.review.data.attributes.image.data.attributes.formats.small.url
        }
        linkURL={`/`}
        linkText={"Go Back"}
        isCard={false}
      />
    </div>
  );
};

export default ReviewPage;
