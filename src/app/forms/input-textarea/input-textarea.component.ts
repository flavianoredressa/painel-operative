import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Input, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { inputUUID } from '@burand/angular/utils';

import { ControlValueAccessorConnectorComponent } from '../control-value-accessor-connector';

@Component({
  standalone: true,
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputTextareaComponent,
      multi: true
    }
  ]
})
export class InputTextareaComponent extends ControlValueAccessorConnectorComponent {
  @Input() id = inputUUID();
  @Input() placeholder: string;
  @Input() label: string;
  @Input() rows = 3;

  @ContentChildren('rightIcon') rightIcon: TemplateRef<unknown>;
}
