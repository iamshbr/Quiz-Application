import { useState } from "react";
import { QuestionCard } from "./components";
import getQuizData from "./api";
import { AnswerObject, Difficulty, QuestionState } from "./types";

const App: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const totalQuestion = 10;

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions: QuestionState[] = await getQuizData(totalQuestion, Difficulty.HARD);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => {
        return [...prev, answerObj];
      });
    }
  };

  const nextQuestion = () => {
    if (number + 1 === totalQuestion) {
      setGameOver(true);
    } else {
      setNumber(number + 1);
    }
  };

  return (
    <>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">Quiz Application</h1>
            {(gameOver || userAnswers.length === totalQuestion) && (
              <button
                onClick={startQuiz}
                className="mt-6 inline-block rounded dark:bg-gray-800 text-blue-500 px-8 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              >
                Start Quiz
              </button>
            )}

            {!loading && !gameOver && (
              <dl className="mt-6 grid gap-4 sm:mt-8">
                <div className="flex flex-col rounded-lg bg-blue-50 px-2 py-5 text-center dark:bg-blue-700/25">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-white/75">Score</dt>

                  <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl dark:text-blue-50">{score}</dd>
                </div>
              </dl>
            )}

            {loading && (
              <div className="flex justify-center">
                <button
                  disabled
                  type="button"
                  className="mt-5 py-2.5 px-5 me-2 text-sm font-medium text-gray-900 rounded-lg  hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center"
                >
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading Question...
                </button>
              </div>
            )}

            {!loading && !gameOver && (
              <QuestionCard
                questionNo={number + 1}
                question={questions[number]?.question}
                totalQuestion={totalQuestion}
                answers={questions[number]?.answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
            )}

            {!loading && !gameOver && userAnswers.length === number + 1 && number !== totalQuestion - 1 && (
              <button
                onClick={nextQuestion}
                className="mt-5 flex items-center justify-self-center justify-between gap-4 rounded-lg  dark:bg-gray-800 text-blue-500 px-5 py-3 transition-colors hover:bg-transparent border hover:border-l-sky-100 focus:outline-none focus:ring"
              >
                <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">Next Question</span>

                <span className="shrink-0 rounded-full p-2  text-blue-500">
                  <svg className="size-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
