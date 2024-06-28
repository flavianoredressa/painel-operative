import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ActivityRepository } from '@repositories/activity.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './activity-create.component.html'
})
export class ActivityCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private activityRepository = inject(ActivityRepository);
  private ngbActiveModal = inject(NgbActiveModal);

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
        const activity = await this.activityRepository.getActivityById(this.idActivity);
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
      this.toastrService.success(`Atividade ${!this.idActivity ? 'cadastrada' : 'atualizado'} com sucesso.`);
      this.ngbActiveModal.close(true);
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }

  close() {
    this.ngbActiveModal.close();
  }
}
