import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from '@burand/angular/validators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../authentication.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _auth: AuthService
  ) {}

  async ngOnInit() {
    this.form = this.builder.group({
      email: [{ value: null, disabled: true }, [Validators.required, emailValidator]],
      newPassword: [null, [Validators.required, Validators.minLength(6)]]
    });

    const { oobCode } = this.route.snapshot.queryParams;
    if (!oobCode) {
      this.router.navigateByUrl('/forgot-password', {
        replaceUrl: true
      });

      return;
    }

    try {
      const accountEmail = await this._auth.verifyPasswordResetCode(oobCode);
      this.form.patchValue({
        email: accountEmail
      });
    } catch (err) {
      this.toastr.error('O código de recuperação está inválido.', 'Erro!');
      this.router.navigateByUrl('/forgot-password', {
        replaceUrl: true
      });
    }
  }

  async handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;

    try {
      const { newPassword } = this.form.value;

      const { oobCode } = this.route.snapshot.queryParams;

      await this._auth.resetPassword(oobCode, newPassword);

      this.toastr.success('Senha alterada com sucesso!');

      this.router.navigateByUrl('/login', {
        replaceUrl: true
      });
    } catch (err) {
      this.toastr.error('O código de recuperação ou e-mail informado estão inválidos.', 'Erro!');
    }

    this.submitting = false;
  }
}
