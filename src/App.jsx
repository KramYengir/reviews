import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Header from "./components/Header/Header";
import ReviewPage from "./pages/ReviewPage";
import Homepage from "./pages/Homepage";
import { FilterProvider } from "./context/FilterContext";

const Layout = () => {
  return (
    <FilterProvider>
      <Header />
      <Outlet />
    </FilterProvider>
  );
};

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  // uri: "https://reviews-app-5fdae.ondigitalocean.app/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div className="container">
      <Router>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/review/:id" element={<ReviewPage />} />
            </Route>
          </Routes>
        </ApolloProvider>
      </Router>
    </div>
  );
};

export default App;
