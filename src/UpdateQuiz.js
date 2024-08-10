import React, { useState } from "react";

const UpdateQuiz = () => {
  const [quizID, setQuizID] = useState("");
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], questionText: e.target.value };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex] = e.target.value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options };
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], correctAnswer: e.target.value };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleUpdateQuiz = async () => {
    const data = {
      quizID,
      questions,
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
    <div className="container glass-effect center-div p-5 d-flex flex-column align-items-center">
      <h1>Update a Quiz</h1>
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
      <div className="form-group">
        <label htmlFor="questions">Questions:</label>
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
            <div className="d-flex">
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
            <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}
        <button type="button" className="mx-4 btn btn-primary" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
      <button className="my-4 btn btn-success" onClick={handleUpdateQuiz}>Update Quiz</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateQuiz;
