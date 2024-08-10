import React, { useState, useEffect } from "react";

const Subscribe = () => {
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [professorDetails, setProfessorDetails] = useState([]);
  const [emailS, setEmailS] = useState("");

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
  };

  const handleSubscribe = () => {
    const userEmail = emailS;

    const selectedProfessorDetails = professorDetails.find(
      (professor) => professor.email === selectedProfessor
    );

    const professorArn = selectedProfessorDetails
      ? selectedProfessorDetails.snsTopicArn
      : "";

    const payload = {
      email: userEmail,
      topicArn: professorArn,
    };
    console.log(payload);

    fetch(
      "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/fetcharn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  useEffect(() => {
    fetch("https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/fetcharn")
      .then((response) => response.json())
      .then((data) => setProfessorDetails(data));
  }, []);
  return (
    <div className="container glass-effect center-div p-5 d-flex flex-column align-items-center ">
      <h1>Subscribe</h1>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={emailS}
          onChange={(e) => setEmailS(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>

      <table className="table mt-5 table-striped rounded-3 overflow-hidden">
        <thead>
          <tr>
            <th>Professor</th>
            <th>Subscribe</th>
          </tr>
        </thead>
        <tbody>
          {professorDetails.map((professor) => (
            <tr key={professor.HostID}>
              <td>{professor.email}</td>
              <td>
                <input
                  type="radio"
                  name="professor"
                  value={professor.email}
                  checked={selectedProfessor === professor.email}
                  onChange={handleProfessorChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subscribe;
