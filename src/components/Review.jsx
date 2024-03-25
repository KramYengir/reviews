import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Markdown from "react-markdown";

const Review = ({ rating, title, categories, body, link }) => {
  // const ratingStyle = () => {
  //   if (rating >= 9) return "masterpiece";
  //   else if (rating < 9 && rating >= 7) return "good";
  //   else if (rating < 7 && rating > 4) return "average";
  //   else return "terrible";
  // };

  return (
    <article className="review-card">
      <div className="rating">{rating}</div>
      <h2>{title}</h2>
      {categories.map((category) => (
        <small key={category.id}>{category.attributes.name}</small>
      ))}
      <Markdown>{link ? body.substring(0, 400) + "..." : body}</Markdown>
      {link && <Link to={`/review/${link}`}>Read More</Link>}
    </article>
  );
};

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  body: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default Review;
