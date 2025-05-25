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

  selectedType: string = "";

  quizForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    maxErrors: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(3)]),
    question1: new FormControl('', [Validators.required]),
    typeQuestion1: new FormControl('', [Validators.required]),
    correctAnswerOpen1: new FormControl(''),
    answerA1: new FormControl(''),
    answerB1: new FormControl(''),
    answerC1: new FormControl(''),
    answerD1: new FormControl(''),
    correctAnswerMultiple1: new FormControl(1, [Validators.min(1), Validators.max(4)]),
  });

  onTypeChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.selectedType = target.value;

    if (this.selectedType === 'open-ended') {
      this.quizForm.get('correctAnswerOpen1')?.setValidators([Validators.required]);
      this.quizForm.get('answerA1')?.clearValidators();
      this.quizForm.get('answerB1')?.clearValidators();
      this.quizForm.get('answerC1')?.clearValidators();
      this.quizForm.get('answerD1')?.clearValidators();
      this.quizForm.get('correctAnswerMultiple1')?.clearValidators();
    } else if (this.selectedType === 'multiple-choice') {
      this.quizForm.get('correctAnswerOpen1')?.clearValidators();
      this.quizForm.get('answerA1')?.setValidators([Validators.required]);
      this.quizForm.get('answerB1')?.setValidators([Validators.required]);
      this.quizForm.get('answerC1')?.setValidators([Validators.required]);
      this.quizForm.get('answerD1')?.setValidators([Validators.required]);
      this.quizForm.get('correctAnswerMultiple1')?.setValidators([Validators.required, Validators.min(1), Validators.max(4)]);
    }
  
    this.quizForm.get('correctAnswerOpen1')?.updateValueAndValidity();
    this.quizForm.get('answerA1')?.updateValueAndValidity();
    this.quizForm.get('answerB1')?.updateValueAndValidity();
    this.quizForm.get('answerC1')?.updateValueAndValidity();
    this.quizForm.get('answerD1')?.updateValueAndValidity();
    this.quizForm.get('correctAnswerMultiple1')?.updateValueAndValidity();
  }

  handleCreate() {
    this.submitted = true;
    console.log(this.quizForm.value);
    console.log(this.quizForm.valid);
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
              correctAnswerOpen: this.quizForm.value.correctAnswerOpen1 as string,
              answer1: this.quizForm.value.answerA1 as string,
              answer2: this.quizForm.value.answerB1 as string,
              answer3: this.quizForm.value.answerC1 as string,
              answer4: this.quizForm.value.answerD1 as string,
              correctAnswerMultiple: this.quizForm.value.correctAnswerMultiple1 as 1 | 2 | 3 | 4,
            },
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
    console.log('Quiz Created');
  }
}
