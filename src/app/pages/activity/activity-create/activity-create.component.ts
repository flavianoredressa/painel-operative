import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ActivityRepository } from '@repositories/activity.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective],
  templateUrl: './activity-create.component.html'
})
export class ActivityCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private activityRepository = inject(ActivityRepository);

  idActivity = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idActivity) {
        this.loading.set(true);
        const activity = await this.activityRepository.getStatusById(this.idActivity);
        this.formGroup.patchValue(activity);
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
      const activity = {
        active,
        name
      };

      if (!this.idActivity) {
        await this.activityRepository.create(activity);
      } else {
        await this.activityRepository.update(this.idActivity, activity);
      }
      this.toastrService.success(
        `Atividade ${!this.idActivity ? 'cadastrada' : 'atualizada'} com sucesso.`
      );
      this.router.navigateByUrl('/activity');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
