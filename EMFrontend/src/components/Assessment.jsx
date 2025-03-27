import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Assessment.css";

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [score, setScore] = useState(null);  // State to store the score
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);  // New state to track if the test is completed
  const navigate = useNavigate();

  const startTest = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/assessment/questions");
      const data = await response.json();
      setQuestions(data);
      setTestStarted(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswer = (index, scoreValue) => {
    setAnswers({ ...answers, [index]: scoreValue });
  };

  const handleSubmit = async () => {
    const scores = Object.values(answers);
    try {
      const response = await fetch("http://localhost:8080/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
      });
      const data = await response.json();
      setResult(data.result);  // Set the depression result
      setRecommendation(data.recommendation);  // Set the recommendation
      setScore(data.score);  // Set the calculated score
      setTestCompleted(true);  // Mark the test as completed
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  return (
    <div className="assessment-container">
      <h2>Mental Health Assessment</h2>

      {!testCompleted ? (
        <>
          {!testStarted ? (
            <button onClick={startTest} className="start-btn">Take the Test</button>
          ) : (
            <>
              {questions.map((q, index) => (
                <div key={index} className="question-card">
                  <p>{q.question}</p>
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5].map((scoreValue) => (
                      <button
                        key={scoreValue}
                        onClick={() => handleAnswer(index, scoreValue)}
                        className={answers[index] === scoreValue ? "selected" : ""}
                      >
                        {scoreValue}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={handleSubmit} className="submit-btn">Submit</button>
            </>
          )}
        </>
      ) : (
        <div className="result">
          <h3>Test Score: {score} / 50</h3>  {/* Display the score out of 50 */}
          <h4>Depression Level: {result}</h4>
          {recommendation && <p>Recommendation: {recommendation}</p>}
          <button onClick={() => navigate("/home")}>Back to Home</button>
        </div>
      )}
    </div>
  );
};

export default Assessment;
