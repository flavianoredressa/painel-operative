import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-user-types-create',
  standalone: true,
  imports: [],
  templateUrl: './user-types-create.component.html'
})
export class UserTypesCreateComponent implements OnInit {
  idUserTypes = getRouterParam('id');

  ngOnInit() {
    console.log(this.idUserTypes);

    if (this.idUserTypes) {
      console.log('edit');
    }
  }
}
