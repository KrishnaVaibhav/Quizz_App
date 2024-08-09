import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navb = () => {
    const { user, logout } = useAuth();
    console.log("user navvvv:", user);
    const handleLogout = () => {
        logout();
        return <Navigate to="/login" replace />;
    };
    return (
        <Navbar className=" d-flex justify-content-between mb-5" bg="dark" variant="dark">
        <Navbar.Brand className="mx-5" href="/">Quizz App</Navbar.Brand>
        <Nav className="mx-5">
          { user && <Nav.Link href="/host">Host Dashboard</Nav.Link> }
          <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
          { user && <Nav.Link href="/quiz">Quiz Form</Nav.Link>}
          { user && <Nav.Link href="/getquiz">Get Quiz</Nav.Link>}
          { user && <Nav.Link href="/deletequiz">Delete Quiz</Nav.Link>}
          { user && <Nav.Link href="/updatequiz">Update Quiz</Nav.Link>}
          { !user && <Nav.Link href="/login" >Login</Nav.Link>}
          { !user && <Nav.Link href="/signup">Signup</Nav.Link>}
          { user && <Nav.Link href="/" onClick={handleLogout} >Logout</Nav.Link>}
        </Nav>
      </Navbar>
    );
}

export default Navb;