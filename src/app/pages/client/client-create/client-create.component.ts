import { NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ClientRepository } from '@repositories/client.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule, NgIf],
  templateUrl: './client-create.component.html'
})
export class ClientCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private clientRepository = inject(ClientRepository);

  idClients = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    manager: ['', [Validators.required]],
    CNPJ: ['', [Validators.required]],
    CEP: ['', [Validators.required]],
    cellphone: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: [0, [Validators.required]],
    district: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    corporateName: ['', [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idClients) {
        this.loading.set(true);
        const client = await this.clientRepository.getStatusById(this.idClients);
        this.formGroup.patchValue(client);
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
      const {
        name,
        active,
        email,
        manager,
        CNPJ,
        CEP,
        cellphone,
        street,
        number,
        district,
        city,
        state,
        corporateName
      } = this.formGroup.value;
      const client = {
        active,
        name,
        email,
        manager,
        CNPJ,
        CEP,
        cellphone,
        street,
        number,
        district,
        city,
        state,
        corporateName,
        type: {
          id: 2,
          active: true,
          name: 'cliente'
        }
      };

      client.number = parseInt(client.number + ' ');

      console.log(client);

      if (!this.idClients) {
        await this.clientRepository.create(client);
      } else {
        await this.clientRepository.update(this.idClients, client);
      }
      this.toastrService.success(`Clients ${!this.idClients ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/client');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }

  showDefaultImage = true;
  profileImageUrl: string;

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Obtém o input de arquivo
    const arquivo = inputElement.files?.[0]; // Obtém o arquivo de imagem selecionado pelo usuário

    if (arquivo) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.profileImageUrl = e.target.result as string; // Define a URL da imagem do perfil como o resultado da leitura do arquivo

          this.showDefaultImage = false; // Define que a imagem do perfil (e não a imagem padrão) deve ser exibida
        }
      };
      reader.readAsDataURL(arquivo); // Lê o conteúdo do arquivo como um URL de dado
    }
    inputElement.value = ''; // Limpar o valor do arquivo selecionado no input
  }
}
