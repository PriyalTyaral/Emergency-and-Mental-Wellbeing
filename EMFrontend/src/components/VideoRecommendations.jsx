import { useState, useEffect } from "react";
import "./VideoRecommendations.css";

const VideoRecommendations = () => {
  const [query, setQuery] = useState("Stress");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const recommendedCategories = [
    "Self help",
    "Reducing stress",
    "Anxiety",
    "Panic attacks",
    "Breathing exercises",
    "Stretching",
    "Calm music",
    "Meditation",
  ];

  const fetchVideos = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setVideos([]); // Clear previous results
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery
        )}&type=video&key=AIzaSyB9BiwBOsMq5ym4rFXeyG1CQtjQHnK9oVE`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch videos. Try again later.");
      }
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos. Please check your connection.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos(query);
  }, [query]); // Now it updates when query changes

  return (
    <div className="video-container">
      <h2 className="heading">🎥 Video Recommendations</h2>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for topics..."
        />
        <button onClick={() => fetchVideos(query)}>🔍 Search</button>
      </div>

      {/* 🔥 FIX: Category buttons in a single row with wrapping */}
      <div className="categories">
        {recommendedCategories.map((category, index) => (
          <button key={index} onClick={() => fetchVideos(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* Display Loading, Error, or Videos */}
      <div className="video-list">
        {loading ? (
          <p className="loading-text">Fetching videos...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id.videoId} className="video-card">
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                <p>{video.snippet.title}</p>
              </a>
            </div>
          ))
        ) : (
          <p className="loading-text">No videos found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default VideoRecommendations;
