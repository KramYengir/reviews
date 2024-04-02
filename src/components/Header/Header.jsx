import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useFilter } from "../../context/FilterContext";
import "./Header.css";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const Header = () => {
  const { activeFilter, setActiveFilter } = useFilter();
  const { id } = useParams();

  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  return (
    <header>
      <nav className={id ? "hidden" : "categories"}>
        <Link to="/" onClick={() => setActiveFilter(null)}>
          <h1>
            <span>Mark</span>
            <span>Reviews</span>
          </h1>
        </Link>
        <div className="filter">
          {/* <span>Filter reviews by category: </span> */}
          <a
            onClick={() => setActiveFilter(null)}
            className={!activeFilter ? "active" : ""}
          >
            All
          </a>
          {data.categories.data.map((category) => (
            <a
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={category.id == activeFilter ? "active" : ""}
            >
              {category.attributes.name}{" "}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
