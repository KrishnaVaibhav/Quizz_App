import React, { useState } from "react";

const HostDashboard = () => {
  const [quizID, setQuizID] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [message, setMessage] = useState("");

  const handleBroadcastQuiz = async () => {
    const data = {
      quizID,
      timeLimit,
    };

    try {
      const response = await fetch(
        "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/broadcast-quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Quiz broadcasted successfully");
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error: " + error.toString());
    }
  };

  return (
    <div className="container glass-effect center-div p-5 d-flex flex-column align-items-center">
      <h1>Host Dashboard</h1>
      <div className="form-group">
        <label>Quiz ID:</label>
        <input
          type="text"
          className="form-control"
          value={quizID}
          onChange={(e) => setQuizID(e.target.value)}
          required
        />
      </div>

      <button className="my-4 btn btn-primary" onClick={handleBroadcastQuiz}>
        Broadcast Quiz
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HostDashboard;
