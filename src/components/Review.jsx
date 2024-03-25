import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Review = ({ rating, title, categories, body, link }) => {
  const ratingStyle = () => {
    if (rating >= 9) return "masterpiece";
    else if (rating < 9 && rating >= 7) return "good";
    else if (rating < 7 && rating > 4) return "average";
    else return "terrible";
  };

  return (
    <article className={`review-card ${rating >= 9 && "masterpiece"}`}>
      <div className={`rating ${ratingStyle()}`}>{rating}</div>
      <h2>{title}</h2>
      {categories.map((category) => (
        <small key={category.id}>{category.attributes.name}</small>
      ))}
      <p>{link ? body.substring(0, 400) + "..." : body}</p>
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
  body: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  link: PropTypes.string,
};

export default Review;
