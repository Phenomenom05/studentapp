import styled from "styled-components";

export const FlexedDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  margin-inline: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-inline: 20px; 
    background: 
    linear-gradient(to bottom, rgba(211, 211, 211, 1), rgba(245, 245, 245, 1), rgba(255, 255, 255, 1));
    overflow: hidden
  }
`;

export const Container = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px; 
    order: 2;
    position: absolute;
    top: 300px;
  }
`;

export const ImgContainer = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px; 
    order: 1;
     background: 
    margin-left: 0px;
    border-radius: 10px;
  }
`;

export const StyledInput = styled.input`
  width: 80%;
  padding-block: 15px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 16px;
  background: none;
  padding-left: 12px;
  color: grey;

  &:focus {
    outline: none; 
    color: grey;
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-left: 30px; 
  }
`;

export const Form = styled.form`
  background-color: #043A3B;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  width: 500px;
  padding: 20px 50px;
  padding-left: 150px;
  position: relative;

  @media (max-width: 768px) {
    width: 80%;
    padding-left: 20px; 
    padding-right: 20px; 
    height: 400px;
    margin-left: 8px; 
    border-radius: 10px;
    order: 2;
    background: 
    linear-gradient(to bottom, rgb(4, 58, 59, 0.99), rgb(4, 58, 59), rgba(4, 58, 59, 0.98));
  }
`;

export const LoginButton = styled.button`
  background: none;
  border: 1px solid gray;
  padding: 12px;
  color: gray;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 40%;
  font-size: 20px;
  font-weight: 300;
  margin-left: 100px;
  margin-top: 20px;

  &:hover {
    background-color: #403A3B;
  }

  @media (max-width: 768px) {
    width: 80%; 
    margin-left: 30px;
  }
`;

export const Div = styled.div`
  margin-top: 20px;
`;

export const IconButton = styled.button`
  position: absolute;
  top: 15px;
  right: 10px; 
  background: none;
  border: none;
  padding: 10px; 

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    right: 60px; 
    top: 215px;
  }
`;

export const Img = styled.img`
  max-width: 100%;
  height: auto; 

  @media (max-width: 768px) {
   order: 1;
  }
`;


export const LogoImage = styled.img`
  position: absolute;
  top: 35px;
  left: 100px;
  transform: translateX(-50%);
  z-index: 20;

  @media (max-width: 768px) {
    top: 30px;
    left: 65px;
    height: 80px;
    width: 80px;
    object-fit: contain;
    background-color: rgb(4, 58, 59);
  }
`;
