import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-project-type-create',
  standalone: true,
  imports: [],
  templateUrl: './project-type-create.component.html'
})
export class ProjectTypeCreateComponent implements OnInit {
  idProjectType = getRouterParam('id');

  ngOnInit() {
    console.log(this.idProjectType);

    if (this.idProjectType) {
      console.log('edit');
    }
  }
}
