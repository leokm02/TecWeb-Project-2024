export interface QuestionItem {
  id?: number;
  quizId?: number;
  question: string;
  type: 'open-ended' | 'multiple-choice';
  correctAnswerOpen: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswerMultiple: 1 | 2 | 3 | 4;
  createdAt?: Date;
  updatedAt?: Date;
}
