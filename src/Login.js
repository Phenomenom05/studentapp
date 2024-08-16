// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://davidphenom.pythonanywhere.com/start-exam/",
        { userName, code }
      );
      navigate("/welcome", {
        state: { userName: response.data.userName, code: response.data.code },
      });
    } catch (error) {
      console.error("There was an error starting the exam!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter exam code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
