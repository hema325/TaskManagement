import { Component, inject, OnInit, signal } from '@angular/core';
import { Tasks } from '../../../core/services/tasks';
import { RouterLink } from '@angular/router';
import { HasPermissionDirective } from '../../../shared/directives/has-permission-directive';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../core/models/task';
import { finalize, first } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LoadingButton } from "../../../shared/components/loading-button/loading-button";
import { Permissions } from '../../../core/enums/permissions';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
  imports: [
    RouterLink,
    HasPermissionDirective,
    DatePipe,
    LoadingButton
],
})
export class TasksList implements OnInit {
  private readonly tasks = inject(Tasks);
  private readonly toastr = inject(ToastrService);

  protected readonly tasksList = signal<Task[]>([]);
  protected readonly loading = signal(false);
  protected readonly deletedTaskId = signal<number | null>(null);

  get createPermission() {
    return Permissions.TaskCreate;
  }

  get updatePermission() {
    return Permissions.TaskUpdate;
  }

  get deletePermission() {
    return Permissions.TaskDelete;
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading.set(true);
    this.tasks.getAll()
      .pipe(
        first(),
        finalize(() => this.loading.set(false))
      )
      .subscribe(res => {
        if(res.isSuccess) {
          this.tasksList.set(res.data!);
        }
      })
  }

  delete(id: number) {

    const confirmation = confirm('are you sure you want to delete this task?');

    if(!confirmation)
      return;

    this.deletedTaskId.set(id);
    this.tasks.delete(id)
      .pipe(
        first(),
        finalize(() => this.deletedTaskId.set(null))
      )
      .subscribe(res => {
        if(res.isSuccess) {
          this.toastr.success("Task deleted successfully.");
          this.tasksList.update(ls => ls.filter(t=>t.id != id));
        }
      })
  }
}
