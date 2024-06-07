import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@utils/get-router-param';
@Component({
  selector: 'app-collaborator-create',
  standalone: true,
  imports: [],
  templateUrl: './collaborator-create.component.html'
})
export class CollaboratorCreateComponent implements OnInit {
  idCollaborator = getRouterParam('id');

  ngOnInit() {
    console.log(this.idCollaborator);

    if (this.idCollaborator) {
      console.log('edit');
    }
  }
}
