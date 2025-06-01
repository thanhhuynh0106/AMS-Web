import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import SearchFlightPage from "./pages/SearchFlightPage";
import SearchResultPage from "./pages/SearchResultPage";
import BookingPage from "./pages/BookingPage";
import UserProfilePage from "./pages/UserProfilePage";
import ChatWidget from "./components/chatbot/ChatWidget";
import ChatbotPage from "./pages/ChatbotPage";
import HelpCenter from "./components/support/HelpCenter";
import ExplorePage from "./pages/ExplorePage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/search" element={<SearchFlightPage />} />
        <Route path="/result" element={<SearchResultPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<UserProfilePage/>} />
        <Route path="/chat" element={<ChatbotPage />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <ChatWidget />
    </Router>
  );
};

export default App;