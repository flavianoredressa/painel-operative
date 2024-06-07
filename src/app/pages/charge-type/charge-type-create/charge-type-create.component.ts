import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-charge-type-create',
  standalone: true,
  imports: [],
  templateUrl: './charge-type-create.component.html'
})
export class ChargeTypeCreateComponent implements OnInit {
  idChargeType = getRouterParam('id');

  ngOnInit() {
    console.log(this.idChargeType);

    if (this.idChargeType) {
      console.log('edit');
    }
  }
}
