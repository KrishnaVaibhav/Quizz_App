import React, { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";

const QuizForm = () => {
  const [quizID, setQuizID] = useState("");
  const [hostID, setHostID] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      questionText: e.target.value,
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex] = e.target.value;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options,
    };
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      correctAnswer: e.target.value,
    };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      quizID,
      hostID,
      questions,
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
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      setMessage(result.message || result.error);
    } catch (error) {
      setMessage("Error: " + error.toString());
    }
  };

  useEffect(() => {
    console.log(user);

    setHostID(user);
  }, [user]);

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
            required
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Questions:</label>
          {questions.map((question, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(index, e)}
                placeholder={`Question ${index + 1}`}
                required
              />
              <div className=" d-flex">
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    className="form-control mt-2 me-2"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                    placeholder={`Option ${optionIndex + 1}`}
                    required
                  />
                ))}
              </div>
              <input
                type="text"
                className="form-control mt-2"
                value={question.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(index, e)}
                placeholder="Correct Answer"
                required
              />
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove Question
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mx-4 btn btn-primary"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
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
          <button type="submit" className="btn btn-success">
            Create Quiz
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default QuizForm;
