import { Injectable } from '@angular/core';
import { ModalCropComponent } from '@components/modal-crop/modal-crop.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalCropService {
  constructor(private ngbModal: NgbModal) {}

  /**
   * Open modal for image cropping.
   *
   * Return base64 from encoded image
   *
   * Example in component
   *
   * ```ts
   * private modalCropService = inject(ModalCropService);
   *
   * async handleImage(event: Event) {
   *   const input = event.target as HTMLInputElement;
   *   const baseUrl = await this._crop.crop(input.files[0]);
   *   this.profilePicture = baseUrl;
   * }
   * ```
   */
  async crop(file: File, aspectRatio?: number): Promise<string> {
    const modalRef = this.ngbModal.open(ModalCropComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false
    });

    modalRef.componentInstance.aspectRatio = aspectRatio || 1;
    modalRef.componentInstance.imageFile = file;

    const { croppedImageBase64 } = await modalRef.result.catch(() => ({
      croppedImageBase64: undefined
    }));

    return croppedImageBase64;
  }
}
