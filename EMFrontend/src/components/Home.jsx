import "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const mentalHealthImg = "/assets/mental_health.jpg";
const moodTrackingImg = "/assets/mood_tracking.jpg";
const videoRecommendationImg = "/assets/video_recommendation.jpg";
const sosHelpImg = "/assets/sos_help.jpg";
const chatImg = "/assets/chat.jpg";
const newsImg = "/assets/news.jpg";
const taskImg = "/assets/task.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <h1>Emergency and Mental Health Awareness</h1>
      </header>

      <section className="hero-section">
        <h2>Your Mental Health Matters</h2>
        <p className="description">
          Explore tools and resources to support your mental well-being.
        </p>
      </section>

      <section className="modules-section">
        <div className="module-card" onClick={() => navigate("/assessment")}>
          <img src={mentalHealthImg} alt="Mental Health Assessment" />
          <h3>Mental Health Assessment</h3>
          <p>Evaluate your mental well-being with a quick assessment.</p>
        </div>

        <div className="module-card" onClick={() => navigate("/mood")}>
          <img src={moodTrackingImg} alt="Mood Tracking" />
          <h3>Mood Tracking</h3>
          <p>Track and monitor your mood patterns over time.</p>
        </div>

        <div className="module-card" onClick={() => navigate("/videorecommendations")}>
          <img src={videoRecommendationImg} alt="Video Recommendations" />
          <h3>Video Recommendations</h3>
          <p>Discover helpful videos for mental wellness.</p>
        </div>

        <div className="module-card" onClick={() => navigate("/chatbot")}>
          <img src={chatImg} alt="Chat with Us" />
          <h3>Chat with Us</h3>
          <p>Talk to our AI chatbot for guidance.</p>
        </div>

        <div className="module-card" onClick={() => navigate("/news")}>
          <img src={newsImg} alt="News API Integration" />
          <h3>News Updates</h3>
          <p>Stay updated with the latest mental health news.</p>
        </div>

        <div className="module-card" onClick={() => navigate("/tasks")}>
          <img src={taskImg} alt="Task Management" />
          <h3>Task Management</h3>
          <p>Organize your daily tasks for better mental health.</p>
        </div>

        {/* SOS Help System */}
        <div className="module-card" onClick={() => navigate("/sos")}>
          <img src={sosHelpImg} alt="SOS Help System" />
          <h3>SOS Help System</h3>
          <p>Get immediate assistance with your location.</p>
        </div>
      </section>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <footer className="footer">
        <p>© 2025 Mental Health Awareness. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
