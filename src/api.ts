import { Difficulty, ResponseData, Question } from "./types";
import shuffleArray from "./util";

async function getQuizData(amount: number, difficulty: Difficulty) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`);
  if (response.ok) {
    const res: ResponseData = await response.json();
    return res.results.map((question: Question) => {
      return { ...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer]) };
    });
  }

  return [];
}

export default getQuizData;
