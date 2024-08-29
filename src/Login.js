// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FlexedDiv, Container, StyledInput, Form, LoginButton, Div, IconButton, Img, ImgContainer, LogoImage } from "./components/ui/styles";
import LoginImg from './assets/images/Login.png'
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import Logo from './assets/images/NupatLogo.png'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";


const Login = () => {
  const [userName, setUserName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://davidphenom.pythonanywhere.com/start-exam/",
        { userName, code }
      );
      toast.success(`Login successful, Welcome ${userName}!`, {className: "my-toast"});
      navigate("/welcome", {
        state: { userName: response.data.userName, code: response.data.code },
      });
    } catch (error) {
      toast.error(`There was an error logging ${userName} in!`, {className: "my-toast"});
      console.error("There was an error starting the exam!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LogoImage
        src={Logo}
        alt=""
      />

      <FlexedDiv>
        <Container>
          <Form className="" onSubmit={handleSubmit}>

            <StyledInput
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Div>
              <StyledInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter exam code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <IconButton
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye color="grey" /> : <RiEyeCloseLine color="grey" />}
              </IconButton>
            </Div>

            <LoginButton type="submit" disabled={loading}>
              {loading ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Submit"
              )}
            </LoginButton>
          </Form>
        </Container>


        <ImgContainer>
          <Img src={LoginImg} alt="" />
        </ImgContainer>
      </FlexedDiv>
    </div>
  );
};

export default Login;
