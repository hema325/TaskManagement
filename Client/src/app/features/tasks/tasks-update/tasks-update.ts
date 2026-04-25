import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, first } from 'rxjs';
import { Users } from '../../../core/services/users';
import { Tasks } from '../../../core/services/tasks';
import { User } from '../../../core/models/user';
import { LoadingButton } from '../../../shared/components/loading-button/loading-button';
import { ComponentDeactivatable } from '../../../shared/interfaces/component-deactivatable';

@Component({
  selector: 'app-tasks-update',
  templateUrl: './tasks-update.html',
  styleUrl: './tasks-update.css',
  imports: [
    LoadingButton,
    ReactiveFormsModule
  ],
})
export class TasksUpdate implements OnInit, ComponentDeactivatable {
  private readonly tasks = inject(Tasks);
  private readonly users = inject(Users);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    id: [0],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    userId: [0, [Validators.required]]
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
    this.loadTask();
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

  loadTask() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(isNaN(id))
      return;

    this.tasks.get(id)
    .pipe(first())
    .subscribe(res => {
      if(res.isSuccess) {
        this.form.patchValue(res.data!);
      }
    })
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
    this.tasks.update(this.form.value)
      .pipe(
        first(),
        finalize(() => this.submitting.set(false))
      )
      .subscribe(res => {
        if(res.isSuccess) {
          this.form.reset();
          this.toastr.success('Task is updated successfully.');
          this.router.navigateByUrl('/tasks');
        }
      });
  }
}
