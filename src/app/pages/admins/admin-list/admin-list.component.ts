import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserTypeLabel } from '@enums/user-type';
import { Admin } from '@models/admin';
import { AdminRepository } from '@repositories/admin.repository';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html'
})
export class AdminListComponent implements OnInit {
  list: Admin[] = [];
  loading = true;
  UserTypeLabel = UserTypeLabel;

  constructor(
    private _admin: AdminRepository,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    try {
      this.list = await this._admin.getAll();
    } catch {
      this.toastr.error('Não foi possível retornar os dados.', 'Ocorreu um erro!');
      return;
    }

    this.loading = false;
  }

  trackById(_: number, item: Admin) {
    return item.id;
  }
}
