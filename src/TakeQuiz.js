// src/TakeQuiz.js
import React, { useState } from "react";

const TakeQuiz = () => {
  const [quizId, setQuizId] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const handleFetchQuiz = () => {
    // Fetch quiz from the state or database
    const fetchedQuiz = {
      quizId,
      quizName: "Sample Quiz",
      questions: [
        {
          questionText: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
        },
        {
          questionText: "What is the capital of France?",
          options: ["Berlin", "London", "Paris", "Rome"],
          correctAnswer: "Paris",
        },
      ],
    };
    setQuiz(fetchedQuiz);
    setAnswers(Array(fetchedQuiz.questions.length).fill(""));
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    const calculatedScore = quiz.questions.reduce((score, question, index) => {
      return score + (question.correctAnswer === answers[index] ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
    alert(`You scored ${calculatedScore} out of ${quiz.questions.length}`);
  };

  return (
    <div>
      <h2>Take Quiz</h2>
      <input
        type="text"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        placeholder="Quiz ID"
      />
      <button onClick={handleFetchQuiz}>Fetch Quiz</button>
      {quiz && (
        <div>
          <h3>{quiz.quizName}</h3>
          {quiz.questions.map((question, index) => (
            <div key={index}>
              <p>{question.questionText}</p>
              {question.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => {
                      const newAnswers = [...answers];
                      newAnswers[index] = option;
                      setAnswers(newAnswers);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
        </div>
      )}
      {score !== null && (
        <div>
          <h3>Score: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
