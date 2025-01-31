import React from "react";
import { QuestionCardProps } from "../types";

const QuestionCard: React.FunctionComponent<QuestionCardProps> = ({ question, answers, callback, userAnswer, questionNo, totalQuestion }) => {
  return (
    <>
      <div className="w-full max-w-md dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-5">
        <div className="text-blue-500 text-sm mb-5">
          Question {questionNo}/{totalQuestion}
        </div>

        <h2 className="text-lg font-semibold text-white-500 mb-4 mt-5" dangerouslySetInnerHTML={{ __html: question }}></h2>

        <div className="space-y-5">
          {answers &&
            answers.map((answer) => {
              return (
                <button
                  value={answer}
                  key={answer}
                  disabled={!!userAnswer}
                  className={`w-full dark:bg-blue-700/25 text-white py-2 rounded-lg ${!userAnswer ? "hover:bg-blue-600 transition" : "cursor-not-allowed opacity-80"} ${
                    userAnswer?.correctAnswer === answer ? "dark:bg-green-600" : ""
                  } ${userAnswer?.answer === answer && userAnswer?.correctAnswer !== answer ? "dark:bg-red-600" : ""}`}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
