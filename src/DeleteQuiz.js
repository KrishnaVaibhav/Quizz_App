// src/DeleteQuiz.js
import React, { useState } from "react";

const DeleteQuiz = () => {
  const [quizID, setQuizID] = useState("");
  const [message, setMessage] = useState("");

  const handleDeleteQuiz = async () => {
    try {
      const response = await fetch(
        `https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/quizzes?quizID=${quizID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error: " + error.toString());
    }
  };

  return (
    <div>
      <h1>Delete a Quiz</h1>
      <div>
        <label>Quiz ID: </label>
        <input
          type="text"
          value={quizID}
          onChange={(e) => setQuizID(e.target.value)}
          required
        />
        <button onClick={handleDeleteQuiz}>Delete Quiz</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteQuiz;
