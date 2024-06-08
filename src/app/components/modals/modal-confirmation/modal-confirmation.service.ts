import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmationComponent } from './modal-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmationService {
  constructor(private modal: NgbModal) {}

  open(options: { title: string; message: string; textCancel: string; textConfirm: string, colorButton?: string }): Promise<boolean> {
    const modal = this.modal.open(ModalConfirmationComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
      windowClass: 'custom-modal'
    });

    modal.componentInstance.title = options.title;
    modal.componentInstance.message = options.message;
    modal.componentInstance.textCancel = options.textCancel;
    modal.componentInstance.textConfirm = options.textConfirm;
    modal.componentInstance.colorButton = options.colorButton? options.colorButton : '!bg-[#e55050]';

    return modal.result.catch(() => null);
  }
}
