import { Component, inject, signal } from '@angular/core';
import { Users } from '../../../core/services/users';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Permissions } from '../../../core/enums/permissions';
import { PermissionPipe } from '../../../shared/pipes/permission-pipe';
import { finalize, first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { userNameExists } from '../../../core/validators/user-name-exists-validator';
import { ComponentDeactivatable } from '../../../shared/interfaces/component-deactivatable';
import { LoadingButton } from "../../../shared/components/loading-button/loading-button";

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.html',
  styleUrl: './users-create.css',
  imports: [
    ReactiveFormsModule,
    PermissionPipe,
    LoadingButton
],
})
export class UsersCreate implements ComponentDeactivatable {
  private readonly users = inject(Users);
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  protected form = this.fb.group({
    userName: ['', [Validators.required], [userNameExists(this.users)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    permissions: [[]]
  });

  get userName() {
    return this.form.controls.userName;
  }

  get password() {
    return this.form.controls.password;
  }

  get permissions() {
    return this.form.controls.permissions;
  }

  protected readonly permissionsValues = signal<number[]>([]);
  protected readonly submitting = signal(false);
  public readonly hasChanges = () => this.form.dirty;

  ngOnInit() {
    const permissionsValues = Object.keys(Permissions)
                                  .map(key => Number(key))
                                  .filter(key => !isNaN(key) && key > 0);

    this.permissionsValues.set(permissionsValues);
  }

  submit() {
    console.log(this.form.value);

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.users.create(this.form.value)
    .pipe(
      first(),
      finalize(() => this.submitting.set(false))
    )
    .subscribe(res => {
      if(res.isSuccess) {
        this.form.reset();
        this.toastr.success('User is created successfully.');
        this.router.navigateByUrl('/users');
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/users');
  }
}
