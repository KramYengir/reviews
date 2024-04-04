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
  isCard,
  date,
}) => {
  return (
    <article
      className="review-card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="review-header-fade"></div>
      <div className="card__top">
        <div>
          <h2>
            {isCard && title.length > 22
              ? title.substring(0, 23) + "..."
              : title}
          </h2>
          <small>{category}</small>
        </div>
        <div className="rating">{rating}</div>
      </div>

      <Markdown>{isCard ? body.substring(0, 180) + "..." : body}</Markdown>
      <div className="card__bottom">
        <small>{date.substring(0, 10)}</small>
        <Link to={linkURL}>{linkText}</Link>
      </div>
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
  isCard: PropTypes.bool,
  date: PropTypes.string.isRequired,
};

export default Review;
