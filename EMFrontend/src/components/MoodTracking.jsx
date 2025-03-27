import  { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import "./MoodTracking.css";

const MoodTracking = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState(3); // Default to neutral
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Load mood history from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(savedHistory);
    setTimeout(() => renderChart(savedHistory), 100); // Ensure the canvas is available
  }, []);

  const moodDescriptions = [
    "Very Sad 😢",
    "Sad 😞",
    "Neutral 😐",
    "Happy 😊",
    "Very Happy 😃",
  ];

  const handleSaveMood = () => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      moodScore: mood,
      description,
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
    renderChart(updatedHistory);
  };

  const renderChart = (data) => {
    if (!chartRef.current) return;

    // Destroy existing chart instance before re-rendering
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: "Mood Score",
            data: data.map((entry) => entry.moodScore),
            borderColor: "blue",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  return (
    <div className="mood-tracker-container">
      <h2>Rate Your Mood</h2>
      <input
        type="range"
        min="1"
        max="5"
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
      />
      <p><strong>Mood Description:</strong> {moodDescriptions[mood - 1]}</p>

      <textarea
        placeholder="Journal Entry"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button onClick={handleSaveMood}>Save Mood</button>
      <button onClick={() => navigate("/home")}>Back to Home</button>

      <h2>Weekly Mood Report</h2>
      <div style={{ width: "100%", height: "300px" }}>
        <canvas ref={chartRef}></canvas>
      </div>

      <h2>Previous Mood Reports</h2>
      {history.length === 0 ? (
        <p>No past reports available</p>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Mood:</strong> {moodDescriptions[entry.moodScore - 1]}</p>
              <p>{entry.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoodTracking;
