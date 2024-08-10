import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [quizId, setQuizId] = useState("");

  const fetchLeaderboard = async () => {
    try {
      console.log(quizId);
      const response = await fetch(
        `https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/leaderboard?quizId=${quizId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filteredData = data.reduce((acc, entry) => {
        const existingEntry = acc.find(
          (item) => item.email === entry.email
        );
        if (existingEntry) {
          if (entry.score > existingEntry.score) {
        existingEntry.score = entry.score;
          }
        } else {
          acc.push(entry);
        }
        return acc;
      }, []).filter(entry => entry.quizID === quizId);


      setLeaderboard(filteredData);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError("Error fetching leaderboard");
    }
  };
  const handleQuizIdChange = (event) => {
    setQuizId(event.target.value);
  };
  console.log(quizId);
  return (
    <div className="container glass-effect center-div p-5">
      <h2 className="text-center">Leaderboard</h2>
      <div className="mb-3">
        <label htmlFor="quizIdInput" className="form-label">
          Quiz ID:
        </label>
        <input
          type="text"
          className="form-control"
          id="quizIdInput"
          value={quizId}
          onChange={handleQuizIdChange}
        />
      </div>
      <button className="my-3 btn btn-warning" onClick={fetchLeaderboard}>Get Leaderboard</button>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped rounded-3 overflow-hidden table-hover ">
        <thead className="thead-dark">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.email}</td>
              <td>{entry.participantName}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
