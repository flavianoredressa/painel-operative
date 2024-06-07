import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getRouterParam } from '@utils/get-router-param';
@Component({
  selector: 'app-status-task-create',
  standalone: true,
  imports: [],
  templateUrl: './status-task-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusTaskCreateComponent implements OnInit {
  idStatusTask = getRouterParam('id');

  ngOnInit() {
    console.log(this.idStatusTask);

    if (this.idStatusTask) {
      console.log('edit');
    }
  }
}
