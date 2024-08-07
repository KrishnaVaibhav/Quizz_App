import React, { useState, useEffect } from "react";

const ParticipantQuiz = () => {
  const [participantName, setParticipantName] = useState("");
  const [email, setEmail] = useState("");
  const [quizID, setQuizID] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0 && quiz) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      handleSubmitAnswers();
    }
  }, [timeLeft, quiz]);

  const handleGetQuiz = async () => {
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
        setTimeLeft(60);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error: " + error.toString());
    }
  };

  const handleSubmitAnswers = async () => {
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
    <div>
      <h1>Start a Quiz</h1>
      <div>
        <label>Participant Name: </label>
        <input
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          required
        />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Quiz ID: </label>
        <input
          type="text"
          value={quizID}
          onChange={(e) => setQuizID(e.target.value)}
          required
        />
        <button onClick={handleGetQuiz}>Start Quiz</button>
      </div>
      {message && <p>{message}</p>}
      {quiz && (
        <div>
          <h2>{quiz.quizName}</h2>
          <p>Time left: {timeLeft} seconds</p>
          <ul>
            {quiz.questions.map((q, index) => (
              <li key={index}>
                <p>{q.questionText}</p>
                <ul>
                  {q.options.map((option, idx) => (
                    <li key={idx}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                          }
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitAnswers}>Submit Answers</button>
        </div>
      )}
      {score && (
        <div>
          <h2>
            Your Score: {score.score} out of {score.total}
          </h2>
        </div>
      )}
    </div>
  );
};

export default ParticipantQuiz;
