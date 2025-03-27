import { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";

const News = () => {
  const [query, setQuery] = useState("mental health");
  const [articles, setArticles] = useState([]);

  const fetchNews = async (searchQuery) => {
    try {
      const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}`
      );
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(query);
  }, []);

  return (
    <div className="news-container">
      <h2>You Know What?</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news topics..."
        className="news-search"
      />
      <button onClick={() => fetchNews(query)}>Search</button>

      <div className="news-list">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="news-card">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                <h3>{article.title}</h3>
                <p>{article.source.name}</p>
              </a>
            </div>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </div>
    </div>
  );
};

export default News;
