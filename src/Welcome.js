import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import WelcomeImage from './assets/images/bro.png'
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";



const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, code } = location.state;
  const [loading, setLoading] = useState(false);


  const handleProceed = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://davidphenom.pythonanywhere.com/proceed-exam/${code}/${userName}/`
      );
      toast.success(`Exam started successfully for ${userName}!`);

      // Check if the response contains a redirect URL
      if (response.status === 200 && response.data.redirect_url) {
        navigate(`/get-question/${code}/${userName}`, {
          state: { userName, code, examType: "obj" }, // assuming objective questions
        });
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      toast.error("There was an error starting the exam!");
      console.error("There was an error proceeding with the exam!", error);
    }
  };

  return (
    <div style={{
      marginTop: '50px',
    }}>
      <h1 style={{
        textAlign: "left",
        color: 'green',
        marginLeft: '20px',
        marginTop: '10px',
      }}>Welcome, {userName}!</h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20px',
      }}>
        <img src={WelcomeImage} alt="" />
      </div>

      <p style={{
        textAlign: "center",
        color: 'green',
        margin: '0',
        marginBottom: '20px',
        marginTop: '20px',
        fontSize: '20px',
        fontWeight: '600',
        overflow: 'hidden',
      }}>Good luck on your exam.</p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20px',
      }}>
        <button
          style={{
            backgroundColor: '#043A3B',
            border: 'none',
            padding: '10px 40px',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '100',
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
          }}
          onClick={handleProceed}>{loading ? (
            <ClipLoader size={20} color={"#fff"} />
          ) : (
            "Proceed to exam"
          )}<IoArrowForwardCircleSharp /></button>
      </div>
    </div>
  );
};

export default Welcome;
