import React from "react";
import Navbar from "../components/navbar/navbar";
import Home from "../components/home/Home";
import Search from "../components/search/Search";
import Support from "../components/support/Support";
import Info from "../components/info/Info";
import Lounge from "../components/lounge/Lounge";
import Subscribers from "../components/subcribers/Subcribers";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Search />
      <Support />
      <Info />
      <Lounge />
      <Subscribers />
      <Footer />
    </>
  );
};

export default HomePage;