import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-checklist-create',
  standalone: true,
  imports: [],
  templateUrl: './checklist-create.component.html'
})
export class ChecklistCreateComponent implements OnInit {
  idChecklist = getRouterParam('id');

  ngOnInit() {
    console.log(this.idChecklist);

    if (this.idChecklist) {
      console.log('edit');
    }
  }
}
