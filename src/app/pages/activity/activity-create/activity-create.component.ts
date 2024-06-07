import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-activity-create',
  standalone: true,
  imports: [],
  templateUrl: './activity-create.component.html'
})
export class ActivityCreateComponent implements OnInit {
  idActivity = getRouterParam('id');

  ngOnInit() {
    console.log(this.idActivity);

    if (this.idActivity) {
      console.log('edit');
    }
  }
}
