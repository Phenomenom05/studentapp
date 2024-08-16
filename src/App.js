import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import GetQuestion from "./GetQuestion";
import "./styles.css";
import GetTheoryQuestion from "./GetTheoryQuestion";
import SubmitExam from "./SubmitExam";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/get-question/:code/:userName" element={<GetQuestion />} />
        <Route
          path="/get-theoryquestion/:code/:userName"
          element={<GetTheoryQuestion />}
        />
        <Route
          path="/submit-answer-exam/:code/:userName"
          element={<SubmitExam />}
        />
      </Routes>
    </Router>
  );
};

export default App;
