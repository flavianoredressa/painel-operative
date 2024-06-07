import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@utils/get-router-param';
@Component({
  selector: 'app-cost-center-create',
  standalone: true,
  imports: [],
  templateUrl: './cost-center-create.component.html'
})
export class CostCenterCreateComponent implements OnInit {
  idCostCenter = getRouterParam('id');

  ngOnInit() {
    console.log(this.idCostCenter);

    if (this.idCostCenter) {
      console.log('edit');
    }
  }
}
