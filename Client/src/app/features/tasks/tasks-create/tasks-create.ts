import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingButton } from '../../../shared/components/loading-button/loading-button';
import { Tasks } from '../../../core/services/tasks';
import { Users } from '../../../core/services/users';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../core/models/user';
import { finalize, first } from 'rxjs';
import { ComponentDeactivatable } from '../../../shared/interfaces/component-deactivatable';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.html',
  styleUrl: './tasks-create.css',
  imports: [
    LoadingButton,
    ReactiveFormsModule
  ],
})
export class TasksCreate implements OnInit, ComponentDeactivatable {
  private readonly tasks = inject(Tasks);
  private readonly users = inject(Users);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    userId: ['', [Validators.required]]
  });

  protected readonly usersList = signal<User[]>([]);
  protected readonly submitting = signal(false);
  public readonly hasChanges = () => this.form.dirty;

  get title() {
    return this.form.controls.title;
  }

  get description() {
    return this.form.controls.description;
  }

  get userId() {
    return this.form.controls.userId;
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users.getAll()
      .pipe(first())
      .subscribe(res => {
        if(res.isSuccess) {
          this.usersList.set(res.data!);
        }
      });
  }

  cancel() {
    this.router.navigateByUrl('/tasks');
  }

  submit() {

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.submitting.set(true);
    this.tasks.create(this.form.value)
      .pipe(
        first(),
        finalize(() => this.submitting.set(false))
      )
      .subscribe(res => {
        if(res.isSuccess) {
          this.form.reset();
          this.toastr.success('Task is created successfully.');
          this.router.navigateByUrl('/tasks');
        }
      });
  }


}
