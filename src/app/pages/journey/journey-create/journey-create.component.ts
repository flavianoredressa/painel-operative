import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-jouney-create',
  standalone: true,
  imports: [],
  templateUrl: './journey-create.component.html'
})
export class JourneyCreateComponent implements OnInit {
  idJourney = getRouterParam('id');

  ngOnInit() {
    console.log(this.idJourney);

    if (this.idJourney) {
      console.log('edit');
    }
  }
}
