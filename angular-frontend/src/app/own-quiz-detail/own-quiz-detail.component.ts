import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionItemComponent } from './question-item/question-item.component';
import { ResultsItemComponent } from './result-item/result-item.component';
import { QuestionItem } from '../_services/rest-backend/question-item.type';
import { ResultsItem } from '../_services/rest-backend/results-item.type';

@Component({
  selector: 'app-own-quiz-detail',
  standalone: true,
  imports: [ReactiveFormsModule, QuestionItemComponent, ResultsItemComponent],
  templateUrl: './own-quiz-detail.component.html',
  styleUrl: './own-quiz-detail.component.scss',
})
export class OwnQuizDetailComponent {
  constructor(private route: ActivatedRoute) {}
  id: number = 0;
  quizItem: any;

  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  questions: QuestionItem[] = [];
  results: ResultsItem[] = [];

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.restService.getQuizById(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.quizItem = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchQuestions() {
    this.restService.getQuestions(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.questions = data;
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error(
            'Your access token appears to be invalid. Login again',
            'Token expired'
          );
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(err.message, err.statusText);
        }
      },
    });
  }

  fetchResults() {
    this.restService.getResults(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.results = data;
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error(
            'Your access token appears to be invalid. Login again',
            'Token expired'
          );
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(err.message, err.statusText);
        }
      },
    });
  }
}
