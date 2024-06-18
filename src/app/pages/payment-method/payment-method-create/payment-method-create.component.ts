import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { PaymentMethodRepository } from '@repositories/payment-method.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective],
  templateUrl: './payment-method-create.component.html'
})
export class PaymentMethodCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private paymentMethodRepository = inject(PaymentMethodRepository);

  idPaymentMethods = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idPaymentMethods) {
        this.loading.set(true);
        const paymentMethod = await this.paymentMethodRepository.getStatusById(this.idPaymentMethods);
        this.formGroup.patchValue(paymentMethod);
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
      const paymentMethod = {
        active,
        name
      };

      if (!this.idPaymentMethods) {
        await this.paymentMethodRepository.create(paymentMethod);
      } else {
        await this.paymentMethodRepository.update(this.idPaymentMethods, paymentMethod);
      }
      this.toastrService.success(`Status Sales ${!this.idPaymentMethods ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/payment-method');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
