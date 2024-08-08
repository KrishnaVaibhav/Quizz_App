import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/leaderboard"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Error fetching leaderboard");
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container glass-effect center-div p-5">
      <h2 className="text-center">Leaderboard</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {leaderboard.map((entry, index) => (
          <li className="list-group-item" key={index}>
            <span className="fw-bold">{entry.participantID}:</span> {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
