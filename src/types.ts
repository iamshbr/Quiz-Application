enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

type Question = {
  type: string;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

type QuestionState = Question & { answers: string[] };

type ResponseData = {
  response_code: number;
  results: Question[];
};

type QuestionCardProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestion: number;
};

export { type QuestionCardProps, type ResponseData, type Question, type QuestionState, type AnswerObject, Difficulty };
