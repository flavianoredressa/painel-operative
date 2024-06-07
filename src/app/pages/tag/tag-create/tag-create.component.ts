import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-tag-create',
  standalone: true,
  imports: [],
  templateUrl: './tag-create.component.html'
})
export class TagCreateComponent implements OnInit {
  idTag = getRouterParam('id');

  ngOnInit() {
    console.log(this.idTag);

    if (this.idTag) {
      console.log('edit');
    }
  }
}
