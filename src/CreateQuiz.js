import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev"; // Replace with your actual API endpoint

const CreateQuiz = () => {
  const [quizId, setQuizId] = useState("");
  const [hostId, setHostId] = useState("");
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: currentQuestion, options: currentOptions, correctAnswer },
    ]);
    setCurrentQuestion("");
    setCurrentOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleCreateQuiz = async () => {
    const quizData = {
      quizID: quizId,
      hostID: hostId,
      quizName: quizName,
      questions: questions,
    };

    const payload = {
      body: JSON.stringify(quizData),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/quizzes`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Quiz created successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz");
    }
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <input
        type="text"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        placeholder="Quiz ID"
      />
      <input
        type="text"
        value={hostId}
        onChange={(e) => setHostId(e.target.value)}
        placeholder="Host ID"
      />
      <input
        type="text"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        placeholder="Quiz Name"
      />
      <div>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Question"
        />
        {currentOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...currentOptions];
              newOptions[index] = e.target.value;
              setCurrentOptions(newOptions);
            }}
            placeholder={`Option ${index + 1}`}
          />
        ))}
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Correct Answer"
        />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      <button onClick={handleCreateQuiz}>Create Quiz</button>
      <div>
        <h3>Questions</h3>
        <ul>
          {questions.map((q, index) => (
            <li key={index}>
              {q.questionText} - {q.options.join(", ")} (Correct:{" "}
              {q.correctAnswer})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateQuiz;
