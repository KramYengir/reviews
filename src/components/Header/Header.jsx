import { Link } from "react-router-dom";
import { useFilter } from "../../context/FilterContext";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import "./Header.css";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setActiveFilter } = useFilter();

  isMenuOpen
    ? document.body.classList.add("disable-scrolling")
    : document.body.classList.remove("disable-scrolling");

  return (
    <header className="container">
      <nav>
        <Link to="/" onClick={() => setActiveFilter(null)}>
          <h1>Rigney Reviews</h1>
        </Link>

        {isMenuOpen ? (
          <button aria-expanded={isMenuOpen}>
            <IoCloseSharp onClick={() => setIsMenuOpen(false)} />
          </button>
        ) : (
          <button aria-expanded={isMenuOpen}>
            <IoMenu onClick={() => setIsMenuOpen(true)} />
          </button>
        )}

        <ul aria-hidden={!isMenuOpen}>
          <li>
            <a href="#">Masterpieces</a>
          </li>
          <li>
            <a href="#">Hidden Gems</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Get In Touch</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
