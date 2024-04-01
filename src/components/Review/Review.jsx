import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import "./Review.css";

const Review = ({
  rating,
  title,
  categories,
  body,
  linkURL,
  linkText,
  isShort,
}) => {
  return (
    <article className="review-card">
      <div className="rating">
        {categories.map((category) => (
          <small key={category.id}>{category.attributes.name}</small>
        ))}
        {rating}
      </div>
      <h2>{title}</h2>

      <Markdown>{isShort ? body.substring(0, 200) + "..." : body}</Markdown>
      <Link to={linkURL}>{linkText}</Link>
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
  linkURL: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  isShort: PropTypes.bool,
};

export default Review;
