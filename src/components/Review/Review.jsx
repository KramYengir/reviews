import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import "./Review.css";

const Review = ({
  rating,
  title,
  category,
  body,
  image,
  linkURL,
  linkText,
  isShort,
}) => {
  return (
    <article
      className="review-card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="rating">{rating}</div>
      <div className="review-header-fade"></div>
      <h2>{title}</h2>
      <small>{category}</small>

      <Markdown>{isShort ? body.substring(0, 180) + "..." : body}</Markdown>
      <Link to={linkURL}>{linkText}</Link>
    </article>
  );
};

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.any,
  linkURL: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  isShort: PropTypes.bool,
};

export default Review;
