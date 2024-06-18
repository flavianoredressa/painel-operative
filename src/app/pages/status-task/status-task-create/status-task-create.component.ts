import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { StatusTaskRepository } from '@repositories/status-task.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status-task-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective],
  templateUrl: './status-task-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusTaskCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private statusTaskRepository = inject(StatusTaskRepository);

  idStatusTask = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idStatusTask) {
        this.loading.set(true);
        const statusSale = await this.statusTaskRepository.getStatusById(this.idStatusTask);
        this.formGroup.patchValue(statusSale);
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
      const { name, active } = this.formGroup.value;
      const statusSale = {
        active,
        name
      };

      if (!this.idStatusTask) {
        await this.statusTaskRepository.create(statusSale);
      } else {
        await this.statusTaskRepository.update(this.idStatusTask, statusSale);
      }
      this.toastrService.success(`Status Task ${!this.idStatusTask ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/status-task');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
