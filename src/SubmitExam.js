// src/components/SubmitExam.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SubmitExam = () => {
  const { userName, code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const submitExam = async () => {
      try {
        const response = await axios.post(
          `https://davidphenom.pythonanywhere.com/submit-answer-exam/${code}/${userName}/`
        );
        console.log(response.data.detail);
        alert("Your exam has been submitted successfully.");
        navigate("/"); // Redirect to home or login page after submission
      } catch (error) {
        console.error("Error submitting the exam:", error);
        alert("Something went wrong while submitting the exam.");
      }
    };
    submitExam();
  }, [userName, code, navigate]);

  return (
    <div>
      <h1>Exam Submitted</h1>
      <p>Your exam has been submitted successfully.</p>
    </div>
  );
};

export default SubmitExam;
