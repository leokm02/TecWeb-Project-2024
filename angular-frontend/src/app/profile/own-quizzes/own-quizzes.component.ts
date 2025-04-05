import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { QuizItem } from '../../_services/rest-backend/quiz-item.type';

@Component({
  selector: 'app-own-quizzes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './own-quizzes.component.html',
  styleUrl: './own-quizzes.component.scss'
})
export class OwnQuizzesComponent {
  @Input({ required: true}) quizItem: QuizItem;
  @Output() delete: EventEmitter<number | undefined> = new EventEmitter();
  editLink = "";
  restBackend = inject(RestBackendService);
  toastr = inject(ToastrService);

  ngOnInit(){
    this.editLink = "/my-quizzes/"+this.quizItem?.id;
  }
  

}
