import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from '@animations/fade-in';
import { emailValidator } from '@burand/angular/validators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../authentication.scss'],
  animations: [fadeIn]
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  submitting = false;

  constructor(private builder: FormBuilder, private _auth: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.builder.group({
      email: [null, [Validators.required, emailValidator]]
    });
  }

  async handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;

    try {
      const { email } = this.form.value;

      await this._auth.recoverPassword(email);

      this.toastr.success('E-mail de recuperação enviado com sucesso!');

      this.submitted = true;
    } catch (err) {
      this.toastr.error('Não foi possível enviar o e-mail de recuperação. Tente novamente.', 'Erro!');
    }

    this.submitting = false;
  }
}
