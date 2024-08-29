import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ObjGrid({ onSelectQuestion }) {
  const totalQuestions = 60;
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Array(totalQuestions).fill(false)
  );
  const [questions, setQuestions] = useState([]);

  const answeredCount = answeredQuestions.filter((answered) => answered).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  const handleQuestionClick = (index) => {
    const updatedAnswers = [...answeredQuestions];
    updatedAnswers[index] = !updatedAnswers[index];
    setAnsweredQuestions(updatedAnswers);
    onSelectQuestion(index); // Pass the selected question index to the parent
  };

  return (
    <div>
      <div className="text-center text-white p-4">
        <p className="mb-4">{answeredCount} questions answered already</p>
        <div className="flex items-center relative h-1 w-[100%] bg-gray-300 rounded mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-green-400 rounded"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-10 gap-x-[30px] gap-[25px]">
          {answeredQuestions.map((answered, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className={`w-6 h-6 ${
                  answered ? 'bg-green-400' : 'bg-gray-200'
                } hover:bg-blue-100`}
                onClick={() => handleQuestionClick(index)}
              >
                {answered && <span>&#10003;</span>}
              </button>
              <p className="text-[12px] text-center">{index + 1}</p>
            </div>
          ))}
        </div>

        <div className="mt-[3rem]">
          <Link to="/theory" className="mt-4 px-4 py-2 border border-white text-white rounded-md">
            Move to Theory
          </Link>
        </div>
        <div className="mt-[2rem]">
          <Link to="/pract" className="mt-4 px-4 py-2 border border-white text-white rounded-md">
            Move to Practical
          </Link>
        </div>
      </div>
    </div>
  );
}
