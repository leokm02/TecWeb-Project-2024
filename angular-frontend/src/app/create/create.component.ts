import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { QuestionItem } from '../_services/rest-backend/question-item.type';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  toastr = inject(ToastrService);
  router = inject(Router);
  restService = inject(RestBackendService);
  submitted = false;

  quizForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    maxErrors: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(3)]),
    question1: new FormControl('', [Validators.required]),
    typeQuestion1: new FormControl('', [Validators.required]),
    correctAnswer1: new FormControl(''),
    multipleAnswerA1: new FormControl(''),
    multipleAnswerB1: new FormControl(''),
    multipleAnswerC1: new FormControl(''),
    multipleAnswerD1: new FormControl(''),
    correctMultipleAnswer1: new FormControl(1, [Validators.min(1), Validators.max(3)]),
  });

  handleCreate() {
    console.log('Quiz Created');
    this.submitted = true;
    if (this.quizForm.invalid) {
      this.toastr.error(
        'The data you provided is invalid!',
        'Oops! Invalid data!'
      );
    } else {
      this.restService
        .createQuiz({
          title: this.quizForm.value.title as string,
          description: this.quizForm.value.description as string,
          maxErrors: this.quizForm.value.maxErrors as number,
          questions: [
            {
              question: this.quizForm.value.question1 as string,
              type: this.quizForm.value.typeQuestion1 as "open-ended" | "multiple-choice",
              correctAnswer: this.quizForm.value.correctAnswer1 as string,
              multipleAnswers: {
                answer1: this.quizForm.value.multipleAnswerA1 as string,
                answer2: this.quizForm.value.multipleAnswerB1 as string,
                answer3: this.quizForm.value.multipleAnswerC1 as string,
                answer4: this.quizForm.value.multipleAnswerD1 as string,
                correctAnswer: this.quizForm.value.correctMultipleAnswer1 as 1 | 2 | 3 | 4,
              },
            }
          ]
        })
        .subscribe({
          error: (err) => {
            this.toastr.error(
              'Could not create the quiz!',
              'Oops! Something went wrong.'
            );
          },
          complete: () => {
            this.toastr.success(
              `You have successfully created the quiz!`,
              `You can find it in your profile!`
            );
            this.router.navigateByUrl('/profile');
          },
        });
    }
  }
}
