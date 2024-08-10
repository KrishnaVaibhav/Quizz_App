import React, { useState } from "react";

const ParticipantQuiz = () => {
  const [participantName, setParticipantName] = useState("");
  const [email, setEmail] = useState("");
  const [quizID, setQuizID] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(null);
  const [formValidated, setFormValidated] = useState(false);

  const handleGetQuiz = async () => {
    if (!participantName || !email || !quizID) {
      setMessage("Please fill in all the required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const data = {
      action: "get_quiz",
      quizID,
    };

    try {
      const response = await fetch(
        "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/VerifyQuiz",
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
        setQuiz(result.quiz);
        setAnswers(new Array(result.quiz.questions.length).fill(""));
        setMessage("");
        setFormValidated(true);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error: " + error.toString());
    }
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();

    if (!formValidated) {
      setMessage("Please start the quiz by filling in the required fields.");
      return;
    }

    const data = {
      action: "submit_answers",
      participantName,
      email,
      quizID,
      answers,
    };

    try {
      const response = await fetch(
        "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/VerifyQuiz",
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
        setScore(result);
        setMessage(`Your score is ${result.score} out of ${result.total}`);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error: " + error.toString());
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="container glass-effect center-div p-5">
      <h1>Start a Quiz</h1>
      <form onSubmit={handleSubmitAnswers}>
        <div className="form-group">
          <label>Participant Name:</label>
          <input
            type="text"
            className="form-control"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <button className="my-4 btn btn-primary" onClick={handleGetQuiz}>
          Start Quiz
        </button>
        {message && <p>{message}</p>}
        {quiz && (
          <div>
            <h2>{quiz.quizName}</h2>
            {quiz.questions.map((q, index) => (
              <div key={index}>
                <table className="table rounded-3 overflow-hidden table-hover">
                  <thead>
                    <tr>
                      <th>{q.questionText}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {q.options.map((option, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="form-check">
                            <input
                              type="radio"
                              className=" mx-3 form-check-input"
                              name={`question-${index}`}
                              value={option}
                              checked={answers[index] === option}
                              onChange={(e) =>
                                handleAnswerChange(index, e.target.value)
                              }
                            />
                            <label className="form-check-label">
                              {option}
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <button className="my-4 btn btn-primary" type="submit">
              Submit Answers
            </button>
          </div>
        )}
        {score && (
          <div className="score-box text-white">
            <h3>
              Score: {score.score} out of {score.total}
            </h3>
          </div>
        )}
      </form>
    </div>
  );
};

export default ParticipantQuiz;
