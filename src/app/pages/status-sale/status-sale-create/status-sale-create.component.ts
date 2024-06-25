import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { StatusSaleRepository } from '@repositories/status-sale.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './status-sale-create.component.html'
})
export class StatusSaleCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private statusSaleRepository = inject(StatusSaleRepository);

  idStatusSales = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idStatusSales) {
        this.loading.set(true);
        const statusSale = await this.statusSaleRepository.getStatusById(this.idStatusSales);
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

      if (!this.idStatusSales) {
        await this.statusSaleRepository.create(statusSale);
      } else {
        await this.statusSaleRepository.update(this.idStatusSales, statusSale);
      }
      this.toastrService.success(`Status Sales ${!this.idStatusSales ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/status-sales');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
