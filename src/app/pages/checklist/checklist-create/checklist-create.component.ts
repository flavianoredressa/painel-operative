import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ChecklistRepository } from '@repositories/checklist.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './checklist-create.component.html'
})
export class ChecklistCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private checkListRepository = inject(ChecklistRepository);

  idChecklist = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]],
    ref: ['', [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idChecklist) {
        this.loading.set(true);
        const checklist = await this.checkListRepository.getStatusById(this.idChecklist);
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

      if (!this.idChecklist) {
        await this.checkListRepository.create(checklist);
      } else {
        await this.checkListRepository.update(this.idChecklist, checklist);
      }
      this.toastrService.success(`CheckList ${!this.idChecklist ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/checklists');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
