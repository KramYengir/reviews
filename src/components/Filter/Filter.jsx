import "./Filter.css";
import { useFilter } from "../../context/FilterContext";

const Filter = () => {
  const { activeFilter, setActiveFilter } = useFilter();

  return (
    <div className="filter">
      {/* <span>Filter reviews by category: </span> */}
      <button
        onClick={() => setActiveFilter(null)}
        className={!activeFilter ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => setActiveFilter(2)}
        className={activeFilter === 2 ? "active" : ""}
      >
        Film
      </button>
      <button
        onClick={() => setActiveFilter(3)}
        className={activeFilter === 3 ? "active" : ""}
      >
        Tv
      </button>
    </div>
  );
};

export default Filter;
