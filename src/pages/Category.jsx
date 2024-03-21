import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Review from "../components/Review";

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
          <Review
            key={review.id}
            rating={review.attributes.rating}
            title={review.attributes.title}
            categories={review.attributes.categories.data}
            body={review.attributes.body[0].children}
            link={review.id}
          />
        ))}
    </>
  );
};

export default Category;
