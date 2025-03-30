export interface ResultsItem {
  id?: number; 
  quizId: number; 
  userName: string; 
  score: number;
  completed: boolean; 
  createdAt?: Date; 
  updatedAt?: Date;
}
