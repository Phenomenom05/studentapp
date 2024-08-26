import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, code } = location.state;

  const handleProceed = async () => {
    try {
      const response = await axios.post(
        `https://davidphenom.pythonanywhere.com/proceed-exam/${code}/${userName}/`
      );

      // Check if the response contains a redirect URL
      if (response.status === 200 && response.data.redirect_url) {
        navigate(`/get-question/${code}/${userName}`, {
          state: { userName, code, examType: "obj" }, // assuming objective questions
        });
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("There was an error proceeding with the exam!", error);
    }
  };

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>Good luck on your exam.</p>
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default Welcome;
