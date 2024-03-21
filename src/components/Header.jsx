import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useFilter } from "../context/FilterContext";

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

  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  return (
    <header>
      <Link to="/" onClick={() => setActiveFilter(null)}>
        <h1>Mark Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category: </span>
        {data.categories.data.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            onClick={() => setActiveFilter(category.id)}
            className={category.id == activeFilter ? "active" : ""}
          >
            {category.attributes.name}{" "}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
