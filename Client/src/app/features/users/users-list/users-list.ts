import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../shared/directives/has-permission-directive';
import { Permissions } from '../../../core/enums/permissions';
import { Users } from '../../../core/services/users';
import { User } from '../../../core/models/user';
import { finalize, first } from 'rxjs';
import { PermissionPipe } from '../../../shared/pipes/permission-pipe';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingButton } from "../../../shared/components/loading-button/loading-button";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
  imports: [
    HasPermissionDirective,
    PermissionPipe,
    RouterLink,
    LoadingButton
],
})
export class UsersList {
  private readonly users = inject(Users);
  private readonly toastr= inject(ToastrService);
  protected readonly usersList = signal<User[]>([]);
  protected readonly loading = signal(false);
  protected readonly deletedUserId = signal<number | null>(null);

  get createPermission() {
    return Permissions.UserCreate
  }

  get updatePermission() {
    return Permissions.UserChangePermission;
  }

  get deletePermission() {
    return Permissions.UserDelete;
  }

  ngOnInit() {
    this.loadUsersList();
  }

  private loadUsersList() {
    this.loading.set(true);
    this.users.getAll()
    .pipe(
      first(),
      finalize(() => this.loading.set(false))
    )
    .subscribe(res => {
      if(res.isSuccess){
        this.usersList.set(res.data!);
      }
    })
  }

  delete(id: number) {
    const confirmation = confirm('are you sure you want to delete this user?');
    
    if(!confirmation)
      return;

    this.deletedUserId.set(id);
    this.users.delete(id)
      .pipe(
        first(),
        finalize(() => this.deletedUserId.set(null))
      )
      .subscribe(res => {
        if(res.isSuccess) {
          this.toastr.success("User deleted successfully.");
          this.usersList.update(ls => ls.filter(u=>u.id != id));
        }
      });
  }
}
