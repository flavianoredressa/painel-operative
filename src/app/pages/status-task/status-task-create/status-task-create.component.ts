import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-model-create',
  standalone: true,
  imports: [],
  templateUrl: './status-task-create.component.html'
})
export class ModelCreateComponent implements OnInit {
  idStatusTaksCreate = getRouterParam('id');

  ngOnInit() {
    console.log(this.idStatusTaksCreate);

    if (this.idStatusTaksCreate) {
      console.log('edit');
    }
  }
}
