export interface FetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

// We use a types folder and a file to export the various custom types that we make for the app. 

export interface FetchQuizCategoriesResp {
  trivia_categories: QuizCategory[];
}

export interface QuizCategory {
  id: number;
  name: string;
}

export enum QuizDifficulty {
  Mixed = "",
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
export enum QuizType {
  Mixed = "",
  Multiple = "multiple",
  Boolean = "boolean",
}

export interface FetchQuizResponse {
  response_code: number
  results: QuizItem[]
}

export interface QuizItem {
  category: number
  type: QuizType
  difficulty: QuizDifficulty
  question: string
  correct_answer: string
  incorrect_answers: string[]
}