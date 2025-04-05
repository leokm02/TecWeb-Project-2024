import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizItem } from './quiz-item.type';
import { AuthRequest } from './auth-request.type';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {

  url = "http://localhost:3000" 
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(loginRequest: AuthRequest){
    const url = `${this.url}/login`; 
    return this.http.post<string>(url, loginRequest, this.httpOptions);
  }

  signup(signupRequest: AuthRequest){
    const url = `${this.url}/signup`; 
    console.log(signupRequest);
    return this.http.post(url, signupRequest, this.httpOptions);
  }

  getQuizzes() {
    const url = `${this.url}/my-quizzes`; 
    return this.http.get<QuizItem[]>(url, this.httpOptions);
  }

  getQuizById(id: number) {
    const url = `${this.url}/my-quizzes/${id}`; 
    return this.http.get<QuizItem>(url, this.httpOptions);
  }

  createQuiz(quiz: QuizItem){
    const url = `${this.url}/create`;
    return this.http.post<QuizItem>(url, quiz, this.httpOptions);
  }

}
