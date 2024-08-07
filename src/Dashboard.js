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
    <div>
      <h1>Host Dashboard</h1>
      <div>
        <label>Quiz ID: </label>
        <input
          type="text"
          value={quizID}
          onChange={(e) => setQuizID(e.target.value)}
          required
        />
        <label>Time Limit: </label>
        <input
          type="text"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          required
        />
        <button onClick={handleBroadcastQuiz}>Broadcast Quiz</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HostDashboard;
