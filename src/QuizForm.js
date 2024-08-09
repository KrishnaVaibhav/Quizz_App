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
    <div className="container glass-effect center-div p-5 mt-5 ">
      <h1 className="text-center">Create a Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Quiz ID:</label>
          <input
            type="text"
            className="form-control"
            value={quizID}
            onChange={(e) => setQuizID(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Host ID:</label>
          <input
            type="text"
            className="form-control"
            value={hostID}
            onChange={(e) => setHostID(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Questions  <br/> 
            {/* format: question,option1,option2,option3,correctOption */}

          </label>
          <textarea
            className="form-control"
            value={questions}
            placeholder="Format: question,option1,option2,option3,correctOption"
            rows={3}
            onChange={(e) => setQuestions(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quiz Name:</label>
          <input
            type="text"
            className="form-control"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Create Quiz</button>
        </div>
      </form>
      {message && <p>{message}</p>}

    </div>
  );
};

export default QuizForm;
