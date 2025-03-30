import { QuestionItem } from "./question-item.type";
import { ResultsItem } from "./results-item.type";

export interface QuizItem {
  id?: number; 
  title: string; 
  description?: string; 
  maxErrors: number;
  UserUserName?: string; 
  createdAt?: Date; 
  updatedAt?: Date;
  questions?: QuestionItem[];
  results?: ResultsItem[];
}
