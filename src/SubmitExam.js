// src/components/SubmitExam.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Done from './assets/images/Done.png'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        toast.success("Your exam has been submitted successfully.");
        navigate("/"); // Redirect to home or login page after submission
      } catch (error) {
        console.error("Error submitting the exam:", error);
        toast.error("Something went wrong while submitting the exam.");
      }
    };
    submitExam();
  }, [userName, code, navigate]);

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center h-[100vh] ">
      <h1 className="text-[35px] font-[700] text-[#043A3B]">Welldone {userName}</h1>
      <img src={Done} alt="" className="h-[400px] w-[400px]"/>
      <p className="text-[20px] text-[#043A3B]">You have come to the end of your Examination.</p>
    </div>
  );
};

export default SubmitExam;
