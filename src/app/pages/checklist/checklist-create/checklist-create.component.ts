import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ChecklistRepository } from '@repositories/checklist.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective],
  templateUrl: './checklist-create.component.html'
})
export class ChecklistCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private checklistRepository = inject(ChecklistRepository);

  idChecklists = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]],
    ref: ['', [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idChecklists) {
        this.loading.set(true);
        const checklist = await this.checklistRepository.getStatusById(this.idChecklists);
        this.formGroup.patchValue(checklist);
        this.loading.set(false);
      }
    } catch (error) {
      this.loading.set(false);
      this.toastrService.error('Não foi possível carregar os dados.');
      console.error(error);
    }
  }

  async handleSubmit() {
    if (this.formGroup.invalid) {
      this.toastrService.error('Verifique os campos e tenta novamente.');
      return;
    }

    this.submitting.set(true);

    try {
      const { name, active, ref } = this.formGroup.value;
      const checklist = {
        active,
        name,
        ref
      };

      if (!this.idChecklists) {
        await this.checklistRepository.create(checklist);
      } else {
        await this.checklistRepository.update(this.idChecklists, checklist);
      }
      this.toastrService.success(`Checklist ${!this.idChecklists ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/checklist');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
