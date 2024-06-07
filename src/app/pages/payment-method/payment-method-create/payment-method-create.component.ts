import { Component, OnInit } from '@angular/core';
import { getRouterParam } from '@burand/angular';

@Component({
  selector: 'app-jouney-create',
  standalone: true,
  imports: [],
  templateUrl: './payment-method-create.component.html'
})
export class PaymentMethodCreateComponent implements OnInit {
  idPaymentMethod = getRouterParam('id');

  ngOnInit() {
    console.log(this.idPaymentMethod);

    if (this.idPaymentMethod) {
      console.log('edit');
    }
  }
}
