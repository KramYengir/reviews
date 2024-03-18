import { Link } from "react-router-dom";
import usefetch from "../hooks/useFetch";

const URL = "http://localhost:1337/api/reviews";

const Homepage = () => {
  const { data, loading, error } = usefetch(URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  return (
    <>
      {data.data &&
        data.data.map((review) => (
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>
            <small>console list</small>
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

export default Homepage;
