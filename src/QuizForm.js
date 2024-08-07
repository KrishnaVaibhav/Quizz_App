// src/QuizForm.js
import React, { useState } from "react";

const QuizForm = () => {
  const [quizID, setQuizID] = useState("");
  const [hostID, setHostID] = useState("");
  const [questions, setQuestions] = useState("");
  const [quizName, setQuizName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      quizID,
      hostID,
      questions: questions.split("\n").map((q) => {
        const [questionText, ...options] = q.split(",");
        return {
          questionText,
          options: options.slice(0, -1),
          correctAnswer: options[options.length - 1],
        };
      }),
      quizName,
    };

    try {
      const response = await fetch(
        "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/quizzes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ body: JSON.stringify(data) }),
        }
      );
      const result = await response.json();
      setMessage(result.message || result.error);
    } catch (error) {
      setMessage("Error: " + error.toString());
    }
  };

  return (
    <div>
      <h1>Create a Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz ID: </label>
          <input
            type="text"
            value={quizID}
            onChange={(e) => setQuizID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Host ID: </label>
          <input
            type="text"
            value={hostID}
            onChange={(e) => setHostID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            Questions (format: question,option1,option2,option3,correctOption):{" "}
          </label>
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quiz Name: </label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Quiz</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default QuizForm;
