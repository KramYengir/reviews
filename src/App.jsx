import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

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

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div className="App">
      <Router>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/review/:id" element={<ReviewDetails />} />
              <Route path="/category/:id" element={<Category />} />
            </Route>
          </Routes>
        </ApolloProvider>
      </Router>
    </div>
  );
};

export default App;
