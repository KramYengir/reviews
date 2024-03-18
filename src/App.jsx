import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";
import Homepage from "./pages/Homepage";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/review/:id" element={<ReviewDetails />} />
          <Route path="/category/:id" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
