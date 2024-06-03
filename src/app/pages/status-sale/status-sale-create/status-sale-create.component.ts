import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getRouterParam } from '@utils/get-router-param';
@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [],
  templateUrl: './status-sale-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SatusSaleCreateComponent implements OnInit {
  idStatusSales = getRouterParam('id');

  ngOnInit() {
    console.log(this.idStatusSales);

    if (this.idStatusSales) {
      console.log('edit');
    }
  }
}
