// src/GetQuiz.js
import React, { useState } from "react";

const GetQuiz = () => {
  const [quizID, setQuizID] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [message, setMessage] = useState("");

  const handleGetQuiz = async () => {
    try {
      const response = await fetch(
        `https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/quizzes?quizID=${quizID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setQuiz(result);
        setMessage("");
      } else {
        setQuiz(null);
        setMessage(result.error);
      }
    } catch (error) {
      setQuiz(null);
      setMessage("Error: " + error.toString());
    }
  };

  return ( 
    <div className="container glass-effect center-div p-5 text-center d-flex flex-column align-items-center">
      <h1>Get a Quiz</h1>
      <div className="form-group" style={{ maxWidth: "200px" }}>
        <label htmlFor="quizID">Quiz ID:</label>
        <input
          type="text"
          className="form-control"
          id="quizID"
          value={quizID}
          onChange={(e) => setQuizID(e.target.value)}
          required
        />
        <button className="my-4 btn btn-primary" onClick={handleGetQuiz}>
          Get Quiz
        </button>
      </div>
      <div className="message-box" >
        {message && <p style={{ backgroundColor: "#db2e2ebf", color: "white", padding: "10px", margin: "10px",  borderRadius: "10px", border: "1px solid black" }}>{message}</p>}
      </div>
      {quiz && (
        <div>
          <h2>{quiz.quizName}</h2>
          <table className="table table-bordered table-striped rounded-3 overflow-hidden table-hover">
            <thead>
              <tr>
                <th>Question</th>
                <th>Options</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {quiz.questions.map((q, index) => (
                <tr key={index}>
                  <td>{q.questionText}</td>
                  <td>
                    <ul>
                      {q.options.map((option, idx) => (
                        <li key={idx}>{option}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{q.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetQuiz;
