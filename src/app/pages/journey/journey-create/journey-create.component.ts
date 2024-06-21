import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { JourneyRepository } from '@repositories/journey.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jouney-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './journey-create.component.html'
})
export class JourneyCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private journeyRepository = inject(JourneyRepository);

  idJourney = getRouterParam('id');
  selectedJourney = true;
  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]],
    selectedJourney: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idJourney) {
        this.loading.set(true);
        const journey = await this.journeyRepository.getStatusById(this.idJourney);
        this.formGroup.patchValue(journey);
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
      const journey = {
        active,
        name
      };

      if (!this.idJourney) {
        await this.journeyRepository.create(journey);
      } else {
        await this.journeyRepository.update(this.idJourney, journey);
      }
      this.toastrService.success(`Journey ${!this.idJourney ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/journey');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
