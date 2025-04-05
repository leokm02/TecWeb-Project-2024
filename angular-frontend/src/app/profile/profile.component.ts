import { Component, inject } from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OwnQuizzesComponent } from './own-quizzes/own-quizzes.component';
import { RouterLink } from '@angular/router';
import { QuizItem } from '../_services/rest-backend/quiz-item.type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, OwnQuizzesComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authService = inject(AuthService);
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  quizzes: QuizItem[] = [];

  ngOnInit(){
    this.fetchQuizzes();
  }

  fetchQuizzes(){
    this.restService.getQuizzes().subscribe({
      next: (data) => {
        console.log(data);
        this.quizzes = data;
      },
      error: (err) => {
        if(err.status === 401){
          this.toastr.error("Your access token appears to be invalid. Login again", "Token expired");
          this.router.navigateByUrl("/login");
        } else{
          this.toastr.error(err.message, err.statusText)
        }
      }
    });
  }
}
