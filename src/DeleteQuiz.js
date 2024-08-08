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
    <div className="container glass-effect center-div p-5 d-flex flex-column align-items-center">
      <h1>Delete a Quiz</h1>
      <div className="form-group">
        <label htmlFor="quizID">Quiz ID:</label>
        <input
          type="text"
          className="form-control"
          id="quizID"
          value={quizID}
          onChange={(e) => setQuizID(e.target.value)}
          required
        />
      </div>
      <button className="my-4 btn btn-danger" onClick={handleDeleteQuiz}>
        Delete Quiz
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteQuiz;
