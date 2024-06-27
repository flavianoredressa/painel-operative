import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { StatusTaskRepository } from '@repositories/status-task.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-task-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './status-task-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusTaskCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private statusTaskRepository = inject(StatusTaskRepository);

  idStatusTasks = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idStatusTasks) {
        this.loading.set(true);
        const statusTask = await this.statusTaskRepository.getStatusById(this.idStatusTasks);
        this.formGroup.patchValue(statusTask);
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
      const statusTask = {
        active,
        name
      };

      if (!this.idStatusTasks) {
        await this.statusTaskRepository.create(statusTask);
      } else {
        await this.statusTaskRepository.update(this.idStatusTasks, statusTask);
      }
      this.toastrService.success(`Status Tasks ${!this.idStatusTasks ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/status-tasks');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
