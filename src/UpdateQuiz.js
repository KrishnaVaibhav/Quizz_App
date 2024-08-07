// src/UpdateQuiz.js
import React, { useState } from "react";

const UpdateQuiz = () => {
  const [quizID, setQuizID] = useState("");
  const [questions, setQuestions] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateQuiz = async () => {
    const data = {
      quizID,
      questions: questions.split("\n").map((q) => {
        const [questionText, ...options] = q.split(",");
        return {
          questionText,
          options: options.slice(0, -1),
          correctAnswer: options[options.length - 1],
        };
      }),
    };

    try {
      const response = await fetch(
        `https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/quizzes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
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
      <h1>Update a Quiz</h1>
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
        <label>
          Questions (format: question,option1,option2,option3,correctOption):{" "}
        </label>
        <textarea
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          required
        />
      </div>
      <button onClick={handleUpdateQuiz}>Update Quiz</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateQuiz;
