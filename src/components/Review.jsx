import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Review = ({ rating, title, categories, body, link }) => {
  return (
    <article className="review-card">
      <div className="rating">{rating}</div>
      <h2>{title}</h2>
      {categories.map((category) => (
        <small key={category.id}>{category.attributes.name}</small>
      ))}
      <p>{body.map((child) => child.text)}</p>
      {link && <Link to={`/review/${link}`}>Read More</Link>}
    </article>
  );
};

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  body: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  link: PropTypes.string,
};

export default Review;
