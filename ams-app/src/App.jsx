import React from "react";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import Support from "./components/support/Support";
import Info from "./components/info/Info";
import Lounge from "./components/lounge/Lounge";
import Travelers from "./components/travelers/Travelers";
import Subcribers from "./components/subcribers/Subcribers";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Search />
              <Support />
              <Info />
              <Lounge />
              <Subcribers />
            </>
          }
        />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
};


export default App;