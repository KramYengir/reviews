import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const URL = "http://localhost:1337/api/reviews";

const ReviewDetails = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch(URL + "/" + id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  return (
    <article className="review-card">
      <div className="rating">{data.data.attributes.rating}</div>
      <h2>{data.data.attributes.title}</h2>
      <p>{data.data.attributes.body[0].children.map((child) => child.text)}</p>
    </article>
  );
};

export default ReviewDetails;
