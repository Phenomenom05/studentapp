import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, FlexedDiv } from "./components/ui/styles";
import ObjGrid from "./components/ObjGrid";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GetQuestion = () => {

  const Spinner = ({ size = 70, color = '#043A3B' }) => {
    return (
      <div
        className="animate-spin"
        style={{
          height: size,
          width: size,
          border: `4px solid ${color}`,
          borderTop: `4px solid transparent`,
          borderRadius: '50%',
        }}
      ></div>
    );
  };

  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const { userName, code } = useParams();

  useEffect(() => {
    fetchQuestion(); // Fetch the first question on component mount
  }, []);

  const fetchQuestion = async (index = null) => {
    try {
      const url = index !== null
        ? `https://davidphenom.pythonanywhere.com/get-objquestion/${code}/${userName}/?index=${index}`
        : `https://davidphenom.pythonanywhere.com/get-objquestion/${code}/${userName}/`;
      const response = await axios.get(url);
      if (response.data) {
        setQuestion(response.data);
      } else {
        navigate(`/get-theoryquestion/${code}/${userName}`, {
          state: { userName, code },
        });
      }
    } catch (error) {
      toast.error("There was an error fetching the question!", error);
      console.error("There was an error fetching the question!", error);
    }
  };

  const handleNext = async () => {
    try {
      if (question && selectedOption) {
        // Submit the answer
        await axios.post(
          `https://davidphenom.pythonanywhere.com/answer-objquestion/${question.id}/${userName}/`,
          { picked: selectedOption }
        );
        setSelectedOption(""); // Clear the selected option
        fetchQuestion(); // Fetch the next question
      } else {
        toast.error("No question available or no option selected.");
        console.error("No question available or no option selected.");
      }
    } catch (error) {
      toast.error("There was an error processing the next question!", error);
      console.error("There was an error processing the next question!", error);
    }
  };

  const handleSelectQuestion = (index) => {
    console.log('Selected question:', index + 1);
    fetchQuestion(index + 1); // Fetch the question corresponding to the selected index
  };

  if (!question) {
    return <div className="flex justify-center items-center h-[100vh]"><Spinner/></div>;
  }

  return (
    <FlexedDiv className="bg-gray-400">
      <Container>
        <ObjGrid onSelectQuestion={handleSelectQuestion} />
      </Container>
      <Container className="">
        <div className="bg-white py-[50px] px-[30px] mx-[60px] rounded">
          <h2 className="text-[30px]">{question.question}</h2>
          <div className="">
            {['option1', 'option2', 'option3', 'answer'].map((opt, i) => (
              <label key={i} className="flex items-center gap-[20px]">
                <input
                  type="radio"
                  name="option"
                  value={question[opt]}
                  checked={selectedOption === question[opt]}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="block h-[40px]"
                />
                <span className="text-[22px]">{question[opt]}</span>

              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end mr-[100px] mt-[30px]">
          <button onClick={handleNext} className="bg-[#043A3B] text-white py-[8px] px-[30px] rounded">Next</button>
        </div>

      </Container>
    </FlexedDiv>
  );
};

export default GetQuestion;
