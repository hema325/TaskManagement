import { Component, inject, signal } from '@angular/core';
import { Tasks } from '../../../core/services/tasks';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../core/models/task';
import { finalize, first } from 'rxjs';
import { LoadingButton } from "../../../shared/components/loading-button/loading-button";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks-mine',
  templateUrl: './tasks-mine.html',
  styleUrl: './tasks-mine.css',
  imports: [
    LoadingButton,
    DatePipe
  ],
})
export class TasksMine {
  private readonly tasks = inject(Tasks);
  private readonly toastr = inject(ToastrService);

  protected readonly tasksList = signal<Task[]>([]);
  protected readonly loading = signal(false);
  protected readonly toggledTaskId = signal<number | null>(null);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading.set(true);
    this.tasks.getCurrentUserTasks()
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

  toggle(id: number) {

    this.toggledTaskId.set(id);
    this.tasks.toggleCurrentUserTask(id)
      .pipe(
        first(),
        finalize(() => this.toggledTaskId.set(null))
      )
      .subscribe(res => {
        if(res.isSuccess) {
          this.toastr.success("Task toggled successfully.");
            const task = this.tasksList().find(t => t.id == id)!;
            task.isDone = !task.isDone;
        }
      });
  }
}
