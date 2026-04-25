import { Component, inject, OnInit, signal } from '@angular/core';
import { Users } from '../../../core/services/users';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Permissions } from '../../../core/enums/permissions';
import { finalize, first } from 'rxjs';
import { PermissionPipe } from '../../../shared/pipes/permission-pipe';
import { ComponentDeactivatable } from '../../../shared/interfaces/component-deactivatable';
import { LoadingButton } from '../../../shared/components/loading-button/loading-button';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.html',
  styleUrl: './users-update.css',
  imports: [
    ReactiveFormsModule,
    PermissionPipe,
    LoadingButton
  ],
})
export class UsersUpdate implements OnInit, ComponentDeactivatable {
  private readonly users = inject(Users);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    userId: [0],
    permissions: [[0]]
  });

  get permissions() {
    return this.form.controls.permissions;
  }

  protected readonly permissionsValues = signal<number[]>([]);
  protected readonly submitting = signal(false);
  public readonly hasChanges = () => this.form.dirty;
  
  ngOnInit() {
    this.setPermissinsValues();
    this.loadUserPermissions();
  }

  setPermissinsValues() {
        const permissionsValues = Object.keys(Permissions)
                                  .map(key => Number(key))
                                  .filter(key => !isNaN(key) && key > 0);

    this.permissionsValues.set(permissionsValues);
  }

  loadUserPermissions() {
    const userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if(isNaN(userId))
      return;

    this.users.get(userId)
              .pipe(first())
              .subscribe(res => {
                if(res.isSuccess) {
                  this.form.setValue({userId: res.data!.id, permissions: res.data!.permissions});
                }
              });
  }


  cancel() {
    this.router.navigateByUrl("/users");
  }

  submit() {
    
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.users.changePermission(this.form.value)
    .pipe(
      first(),
      finalize(() => this.submitting.set(false)))
    .subscribe(res => {
      if(res.isSuccess) {
        this.form.reset();
        this.toastr.success('user updated succesfully');
        this.router.navigateByUrl('/users');
      }
    })
  }
}
