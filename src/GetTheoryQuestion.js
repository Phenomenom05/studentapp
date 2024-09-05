import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error("Error fetching the theory question:", error);
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
      toast.error("Error submitting the theory question answer:", error);
      console.error("Error submitting the theory question answer:", error);
    }
  };

  return (
    <div className="bg-gray-400 h-screen flex flex-col gap-[30px] justify-center">
      <h1 className="text-[30px] text-[#043A3B] pl-[40px]">Theory Question</h1>
      <p className="bg-white mx-[150px] py-[8px] rounded pl-[10px]">{question}</p>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="bg-white mx-[150px] h-[50%] rounded pl-[10px] focus:outline-none"
      ></textarea>
      <div className="flex justify-center mt-[30px]">
        <button onClick={handleNext}
          className="bg-[#043A3B] text-white py-[8px] px-[30px] rounded"
        >Next</button>
      </div>

    </div>
  );
};

export default GetTheoryQuestion;
