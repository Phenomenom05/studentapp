import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GetTheoryQuestion = () => {
  const [question, setQuestion] = useState("");
  const [id, setId] = useState("");
  const [answer, setAnswer] = useState("");
  const { code, userName } = useParams(); // Extract both code and userName from URL parameters
  const navigate = useNavigate();

  const fetchQuestion = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://davidphenom.pythonanywhere.com/get-theoryquestion/${code}/${userName}/` // Pass both code and userName
      );
      if (response.data.detail === "All questions answered") {
        navigate(`/submit-answer-exam/${code}/${userName}`); // Redirect with both code and userName
      } else {
        setQuestion(response.data.question);
        setId(response.data.id);
      }
    } catch (error) {
      console.error("Error fetching the theory question:", error);
    }
  }, [code, userName, navigate]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleNext = async () => {
    try {
      const response = await axios.post(
        `https://davidphenom.pythonanywhere.com/answer-theoryquestion/${id}/${userName}/`, // Pass both id and userName
        { picked: answer }
      );
      if (response.data.detail === "Answer submitted successfully") {
        setAnswer("");
        fetchQuestion();
      }
    } catch (error) {
      console.error("Error submitting the theory question answer:", error);
    }
  };

  return (
    <div>
      <h1>Theory Question</h1>
      <p>{question}</p>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default GetTheoryQuestion;
