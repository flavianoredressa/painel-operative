import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.scss'
})
export class ModalConfirmationComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() textConfirm: string;
  @Input() textCancel: string;

  constructor(public activeModal: NgbActiveModal) {}
}
