import { Link, useParams } from "react-router-dom";
import { useFilter } from "../../context/FilterContext";
import "./Header.css";

const Header = () => {
  const { setActiveFilter } = useFilter();
  const { id } = useParams();

  return (
    <header className="container">
      <nav className={id ? "hidden" : "categories"}>
        <Link to="/" onClick={() => setActiveFilter(null)}>
          <h1>Rigney Reviews</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
