import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { CollaboratorRepository } from '@repositories/collaborator.repository';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collaborator-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, DatePipe, NgSelectModule],
  templateUrl: './collaborator-create.component.html'
})
export class CollaboratorCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private collaboratorRepository = inject(CollaboratorRepository);

  idCollaborator = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    admission_date: ['', [Validators.required]],
    birth_date: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  selectedStatus = true;

  async ngOnInit() {
    try {
      if (this.idCollaborator) {
        this.loading.set(true);
        const collaborator = await this.collaboratorRepository.getStatusById(this.idCollaborator);
        // ajustar o dia para exibição correta
        const adjustedAdmissionDate = new Date(collaborator.admission_date);
        const adjustedbirthDate = new Date(collaborator.birth_date);
        adjustedAdmissionDate.setDate(adjustedAdmissionDate.getDate() + 1);
        adjustedbirthDate.setDate(adjustedbirthDate.getDate() + 1);
        // Converter a data ajustada para string no formato desejado
        const collaboratorWithDateString = {
          ...collaborator,
          admission_date: formatDate(adjustedAdmissionDate, 'yyyy-MM-dd', 'pt-BR'),
          birth_date: formatDate(adjustedbirthDate, 'yyyy-MM-dd', 'pt-BR')
        };
        this.formGroup.patchValue(collaboratorWithDateString);
        this.loading.set(false);
      }
    } catch (error) {
      this.loading.set(false);
      this.toastrService.error('Não foi possível carregar os dados.');
      console.error(error);
    }
  }

  async handleSubmit() {
    // Verifica se o formulário é inválido
    if (this.formGroup.invalid) {
      this.toastrService.error('Verifique os campos e tenta novamente.');
      return;
    }
    // Define a flag 'submitting' como true para indicar que o formulário está sendo submetido
    this.submitting.set(true);
    try {
      // Obtém os valores de 'admission_date' e 'active' do formulário
      const { admission_date, birth_date, active } = this.formGroup.value;
      const collaborator = {
        active,
        admission_date: parse(admission_date, 'yyyy-MM-dd', new Date()),
        birth_date: parse(birth_date, 'yyyy-MM-dd', new Date())
      };
      // Verifica se é uma criação ou atualização de colaborador e chama o método correspondente do repositório
      if (!this.idCollaborator) {
        await this.collaboratorRepository.create(collaborator);
      } else {
        await this.collaboratorRepository.update(this.idCollaborator, collaborator);
      }
      this.toastrService.success(`Colaborador ${!this.idCollaborator ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/collaborator');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
