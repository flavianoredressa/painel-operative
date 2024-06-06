import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { inputUUID } from '@burand/angular/utils';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { ControlValueAccessorConnectorComponent } from '../control-value-accessor-connector';

const masks = {
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
  ccExpiryDate: '00/0000',
  ccSecurityCode: '0009',
  cnh: '00000000000',
  phone: '(00) 0000-0000||(00) 00000-0000'
};

type InputType = 'text' | 'tel';

@Component({
  standalone: true,
  selector: 'app-input-mask',
  templateUrl: './input-mask.component.html',
  imports: [NgxMaskDirective, ReactiveFormsModule],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputMaskComponent,
      multi: true
    }
  ]
})
export class InputMaskComponent extends ControlValueAccessorConnectorComponent {
  @Input() id = inputUUID();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: InputType = 'text';
  @Input() set mask(value: keyof typeof masks) {
    this.useMask = masks[value];
  }

  useMask: string;
}
