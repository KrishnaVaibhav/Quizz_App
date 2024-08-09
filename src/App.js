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
import Login from "./Login";
import Signup from "./SignUp";
import Navb from "./components/Navb";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div className="App background">
      <AuthProvider>
      <Router>
        <Navb  />

          <Routes>
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" element={<ParticipantQuiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/host" element={<ProtectedRoute> <HostDashboard/> </ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute> <QuizForm/> </ProtectedRoute>} />
            <Route path="/getquiz" element={<ProtectedRoute><GetQuiz /></ProtectedRoute>} />
            <Route path="/deletequiz" element={<ProtectedRoute><DeleteQuiz /></ProtectedRoute>} />
            <Route path="/updatequiz" element={<ProtectedRoute><UpdateQuiz /></ProtectedRoute>} />
            <Route path="*" element={<h1 className="badge rounded-pill fs-1 text-bg-danger text-center mt-5"><span class="badge text-bg-warning m-3">404</span> Not Found </h1>} />
          </Routes>

      </Router>
      </AuthProvider>
      </div>

  );
}


export default App;
