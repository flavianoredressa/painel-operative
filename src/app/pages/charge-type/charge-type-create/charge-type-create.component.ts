import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ChargeTypeRepository } from '@repositories/charge-type.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-charge-type-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './charge-type-create.component.html'
})
export class ChargeTypeCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private chargeTypeRepository = inject(ChargeTypeRepository);

  idChargeType = getRouterParam('id');
  selectedChargeType = true;
  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]],
    selectedChargeType: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idChargeType) {
        this.loading.set(true);
        const chargeType = await this.chargeTypeRepository.getStatusById(this.idChargeType);
        this.formGroup.patchValue(chargeType);
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
      const chargeType = {
        active,
        name
      };

      if (!this.idChargeType) {
        await this.chargeTypeRepository.create(chargeType);
      } else {
        await this.chargeTypeRepository.update(this.idChargeType, chargeType);
      }
      this.toastrService.success(`Charge Type ${!this.idChargeType ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/charge-type');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
