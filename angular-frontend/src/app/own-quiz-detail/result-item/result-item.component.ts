import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { ResultsItem } from '../../_services/rest-backend/results-item.type';

@Component({
  selector: 'app-result-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './result-item.component.html',
  styleUrl: './result-item.component.scss'
})
export class ResultsItemComponent {
  @Input({ required: true}) resultsItem: ResultsItem;
  restBackend = inject(RestBackendService);
  toastr = inject(ToastrService);
}
