import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { QuestionItem } from '../../_services/rest-backend/question-item.type';

@Component({
  selector: 'app-question-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './question-item.component.html',
  styleUrl: './question-item.component.scss'
})
export class QuestionItemComponent {
  @Input({ required: true}) questionItem: QuestionItem;
  restBackend = inject(RestBackendService);
  toastr = inject(ToastrService);
}
