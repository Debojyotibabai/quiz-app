import Option from "../Option";
import "../style/Quiz.css";
import {
  QuestionDataContext,
  SelectedAnswerContext,
  SelectedIdContext,
  QuestionIdContext,
} from "../App";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const [questionId, setQuestionId] = useContext(QuestionIdContext);
  const questionData = useContext(QuestionDataContext);
  const [selectedId, setSelectedId] = useContext(SelectedIdContext);
  const [selectedAnswer, setSelectedAnswer] = useContext(SelectedAnswerContext);
  const navigate = useNavigate();
  const handleChangeOption = (item) => {
    setSelectedId(item);
  };
  const nextHandler = () => {
    if (selectedId !== "") {
      setQuestionId((prev) => {
        return prev + 1;
      });
      setSelectedAnswer((prev) => {
        return [...prev, selectedId];
      });
      setSelectedId("");
    } else {
      alert("Please select an answer");
    }
  };
  const backHandler = () => {
    setQuestionId((prev) => {
      return prev - 1;
    });
  };
  const submitHandler = () => {
    if (selectedId !== "") {
      navigate("/result");
      setSelectedAnswer((prev) => {
        return [...prev, selectedId];
      });
      setSelectedId("");
    } else {
      alert("Please select an answer");
    }
  };
  return (
    <div className="quiz-page">
      <div className="quiz-total-section">
        <p>Question {questionData[questionId].id + 1} : Select an answer</p>
        <h1>{questionData[questionId].question}</h1>
        <div className="option-section">
          {questionData[questionId].answers.map((item, i) => {
            return (
              <Option
                key={i}
                answer={item}
                index={i}
                handleChange={() => {
                  handleChangeOption(item);
                }}
              />
            );
          })}
        </div>
        <div className="quiz-bottom-section">
          <button onClick={questionId > 0 ? backHandler : null}>Back</button>
          <button
            onClick={
              questionId < questionData?.length - 1
                ? nextHandler
                : submitHandler
            }
          >
            {questionId < questionData?.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
