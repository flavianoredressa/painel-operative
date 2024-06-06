import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, Input, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { inputUUID } from '@burand/angular/utils';

import { ControlValueAccessorConnectorComponent } from '../control-value-accessor-connector';

type InputType = 'color' | 'date' | 'datetime-local' | 'month' | 'number' | 'text' | 'time' | 'url' | 'week' | 'email';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',

  imports: [NgTemplateOutlet, ReactiveFormsModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent extends ControlValueAccessorConnectorComponent {
  @Input() id = inputUUID();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: InputType = 'text';
  @Input() position: 'left' | 'right';

  @ContentChildren('Icon') rightIcon: TemplateRef<unknown>;
}
