import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

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
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errrrrrror...</p>;

  return (
    <header>
      <Link to="/">
        <h1>Mark Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category: </span>
        {data.categories.data.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.name}{" "}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
