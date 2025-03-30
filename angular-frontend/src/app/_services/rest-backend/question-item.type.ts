export interface QuestionItem {
  id?: number; 
  quizId: number; 
  question: string; 
  type: "open-ended" | "multiple-choice";
  createdAt?: Date; 
  updatedAt?: Date;
  answers?: { //Nel caso di multiple-choice
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: 1 | 2 | 3 | 4;
  }
  correctAnswer?: string; //Nel caso di open-ended
}
