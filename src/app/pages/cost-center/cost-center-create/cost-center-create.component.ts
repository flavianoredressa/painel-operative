import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { CostCenterRepository } from '@repositories/cost-center.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cost-center-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './cost-center-create.component.html'
})
export class CostCenterCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private costCenterRepository = inject(CostCenterRepository);

  idCostCenter = getRouterParam('id');
  selectedCostCenter = true;
  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]],
  });

  async ngOnInit() {
    try {
      if (this.idCostCenter) {
        this.loading.set(true);
        const costCenter = await this.costCenterRepository.getStatusById(this.idCostCenter);
        this.formGroup.patchValue(costCenter);
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
      const costCenter = {
        active,
        name
      };

      if (!this.idCostCenter) {
        await this.costCenterRepository.create(costCenter);
      } else {
        await this.costCenterRepository.update(this.idCostCenter, costCenter);
      }
      this.toastrService.success(`Cost Center ${!this.idCostCenter ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/cost-center');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
