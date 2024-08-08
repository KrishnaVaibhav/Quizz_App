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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <div className="App background">

      <Router>
        <Navbar className=" d-flex justify-content-between" bg="dark" variant="dark">
          <Navbar.Brand className="mx-5" href="/">Quizz App</Navbar.Brand>
          <Nav className="mx-5">
            <Nav.Link href="/host">Host Dashboard</Nav.Link>
            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            <Nav.Link href="/quiz">Quiz Form</Nav.Link>
            <Nav.Link href="/getquiz">Get Quiz</Nav.Link>
            <Nav.Link href="/deletequiz">Delete Quiz</Nav.Link>
            <Nav.Link href="/updatequiz">Update Quiz</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar>

          <Routes>
            <Route path="/host" element={<HostDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/quiz" element={<QuizForm />} />
            <Route path="/getquiz" element={<GetQuiz />} />
            <Route path="/deletequiz" element={<DeleteQuiz />} />
            <Route path="/updatequiz" element={<UpdateQuiz />} />
            <Route path="/" element={<ParticipantQuiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1 className="badge rounded-pill fs-1 text-bg-danger text-center mt-5"><span class="badge text-bg-warning m-3">404</span> Not Found </h1>} />
          </Routes>

      </Router>
      </div>

  );
}


export default App;
