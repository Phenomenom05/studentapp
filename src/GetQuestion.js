import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const GetQuestion = () => {
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const { userName, code } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `https://davidphenom.pythonanywhere.com/get-objquestion/${code}/${userName}/`
        );
        console.log("Response data:", response.data);
        if (response.data) {
          setQuestion(response.data);
        } else {
          navigate(`/get-theoryquestion/${code}/${userName}`, {
            state: { userName, code },
          });
        }
      } catch (error) {
        console.error("There was an error fetching the question!", error);
      }
    };
    fetchQuestion();
  }, [userName, code, navigate]);

  const handleNext = async () => {
    try {
      if (question && selectedOption) {
        // Submit the answer with the question ID
        await axios.post(
          `https://davidphenom.pythonanywhere.com/answer-objquestion/${question.id}/${userName}/`,
          { picked: selectedOption }
        );

        // Clear the selected option

        // Fetch the next question
        const response = await axios.get(
          `https://davidphenom.pythonanywhere.com/get-objquestion/${code}/${userName}/`
        );
        setSelectedOption("");
        console.log("Next question response data:", response.data);

        if (response.data) {
          setQuestion(response.data);
        } else {
          // Redirect to theory question when no more questions are available
          navigate(`/get-theoryquestion/${code}/${userName}`, {
            state: { userName, code },
          });
        }
      } else {
        console.error("No question available or no option selected.");
      }
    } catch (error) {
      console.error("There was an error processing the next question!", error);
    }
  };

//  if (!question) {
//    return <div>Loading...</div>;
//  }

  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        <label>
          <input
            type="radio"
            name="option"
            value={question.option1}
            checked={selectedOption === question.option1}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {question.option1}
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value={question.option2}
            checked={selectedOption === question.option2}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {question.option2}
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value={question.option3}
            checked={selectedOption === question.option3}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {question.option3}
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value={question.answer}
            checked={selectedOption === question.answer}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {question.answer}
        </label>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default GetQuestion;
