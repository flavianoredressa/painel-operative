import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { inputUUID } from '@burand/angular/utils';

import { CommonModule } from '@angular/common';
import { ControlValueAccessorConnectorComponent } from '../control-value-accessor-connector';

@Component({
  standalone: true,
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputSwitchComponent,
      multi: true
    }
  ]
})
export class InputSwitchComponent extends ControlValueAccessorConnectorComponent {
  @Input() id = inputUUID();
  @Input() label: string;
}
