import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Review from "../components/Review/Review";

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

  const imageBimage =
    "http://localhost:1337" +
    data.review.data.attributes.image.data.attributes.formats.small.url;

  return (
    <div className="review-page">
      <Review
        rating={data.review.data.attributes.rating}
        title={data.review.data.attributes.title}
        category={
          data.review.data.attributes.categories.data[0].attributes.name
        }
        body={data.review.data.attributes.body}
        image={imageBimage}
        linkURL={`/`}
        linkText={"Go Back"}
        isShort={false}
      />
    </div>
  );
};

export default ReviewPage;
