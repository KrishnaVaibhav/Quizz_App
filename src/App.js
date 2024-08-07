// src/App.js
import React from "react";
import QuizForm from "./QuizForm";
import GetQuiz from "./GetQuiz";
import DeleteQuiz from "./DeleteQuiz";
import UpdateQuiz from "./UpdateQuiz";
import ParticipantQuiz from "./ParticipantQuiz";
import "./App.css";
import Leaderboard from "./Leaderboard";
import HostDashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QuizForm />
        <GetQuiz />
        <DeleteQuiz />
        <UpdateQuiz />
        <HostDashboard />
        //login //signup //Host
        <ParticipantQuiz />
        //participant
        <Leaderboard />
        //common
      </header>
    </div>
  );
}

export default App;
