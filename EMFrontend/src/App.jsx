import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Assessment from "./components/Assessment";
import MoodTracking from "./components/MoodTracking";
import VideoRecommendations from "./components/VideoRecommendations";
import Chatbot from "./components/Chatbot";
import News from "./components/News";
import Tasks from "./components/Tasks";
import SOS from "./components/SOS";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/mood" element={<MoodTracking />} />
        <Route path="/videorecommendations" element={<VideoRecommendations />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/news" element={<News />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/sos" element={<SOS />} />
      </Routes>
    </Router>
  );
};

export default App;
