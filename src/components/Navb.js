import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import icon from "../images/quiz.png";

const Navb = () => {
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    return <Navigate to="/login" replace />;
  };

  return (
    <Navbar className="d-flex justify-content-between mb-5" bg="dark" variant="dark" expand="lg" expanded={expanded}>
      <Navbar.Brand className="mx-5 d-flex align-items-center" as={Link} to="/"><img className="mx-3" src={icon} alt="icon" width="50" height="50" />Quizz App</Navbar.Brand>
      <div className="mx-5" >
      <Navbar.Toggle aria-controls="navbar-nav mx-5" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="navbar-nav">
        <Nav >
          {user && <Nav.Link as={Link} to="/host">Host Dashboard</Nav.Link>}
          <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link as={Link} to="/subscribe">Subscribe</Nav.Link>
          {user && <Nav.Link as={Link} to="/quiz">Quiz Form</Nav.Link>}
          {user && <Nav.Link as={Link} to="/getquiz">Get Quiz</Nav.Link>}
          {user && <Nav.Link as={Link} to="/deletequiz">Delete Quiz</Nav.Link>}
          {user && <Nav.Link as={Link} to="/updatequiz">Update Quiz</Nav.Link>}
          {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          {!user && <Nav.Link as={Link} to="/signup">Signup</Nav.Link>}
          {user && <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navb;
