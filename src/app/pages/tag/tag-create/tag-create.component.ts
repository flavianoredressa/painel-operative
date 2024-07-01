import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { TagRepository } from '@repositories/tag.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './tag-create.component.html'
})
export class TagCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private tagRepository = inject(TagRepository);
  private ngbActiveModal = inject(NgbActiveModal);

  idTag = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]],
    color: ['', [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idTag) {
        this.loading.set(true);
        const tag = await this.tagRepository.getStatusById(this.idTag);
        this.formGroup.patchValue(tag);
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
      const { name, active, color } = this.formGroup.value;
      const tag = {
        active,
        name,
        color
      };

      if (!this.idTag) {
        await this.tagRepository.create(tag);
      } else {
        await this.tagRepository.update(this.idTag, tag);
      }
      this.toastrService.success(`Tag ${!this.idTag ? 'cadastrado' : 'atualizado'} com sucesso.`);
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
