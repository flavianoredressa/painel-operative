import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { errorTailorImports } from '@ngneat/error-tailor';
@Component({
  selector: 'app-collaborator-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective],
  templateUrl: './collaborator-create.component.html'
})
export class CollaboratorCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  idCollaborator = getRouterParam('id');
  loading = false;
  submitting = false;

  form = this.formBuilder.group({
    name: [''],
    email: [''],
    phone: [''],
    journey: [''],
    admission: [''],
    birthday: [''],
    cep: [''],
    number: [''],
    address: [''],
    state: [''],
    neighborhood: [''],
    city: [''],
    active: [true]
  });

  ngOnInit() {
    console.log(this.idCollaborator);

    if (this.idCollaborator) {
      console.log('edit');
    }
  }

  handleSubmit() {
    console.log(this.form.value);
  }
}
