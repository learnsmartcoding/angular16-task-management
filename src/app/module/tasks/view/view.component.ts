import { Component, OnInit } from '@angular/core';
import { Subtask, TasksDocument } from 'src/app/models/tasks-document';
import { TasksService } from 'src/app/service/task.service';
import { getBsVer, IBsVersion } from 'ngx-bootstrap/utils';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  tasks: TasksDocument[] = [];
  constructor(private taskService: TasksService, private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getStatusTextColor(status: string): string[] {
    switch (status) {
      case 'Pending':
        return ['btn text-pending'];
      case 'In Progress':
        return ['btn text-in-progress'];
      case 'Completed':
      case 'Done':
        return ['btn btn-success'];
      default:
        return ['']; // Return an empty string for other cases or handle them accordingly
    }
  }

  updateSubtaskStatus(subtask: Subtask, taskId: string) {
    this.taskService.UpdateSubTaskStatus(subtask.status, taskId, subtask.id).subscribe({
      next: value => {
        this.toastrService.success('Success', 'Sub Task Updated');
      }, complete: () => { },
      error: error => {
        console.error(error);
      }
    });
  }

  getTasks() {
    this.taskService.GetTasks('LSC').subscribe(s => {
      this.tasks = s;
    })
  }

  goToUpdateTask(taskId: string) {
    this.router.navigate(['/tasks/edit', taskId]);
  }

  deleteTask(taskId:string){
    this.taskService.DeleteTask('LSC', taskId).subscribe({
      next: value => {
        this.toastrService.success('Success', 'Task deleted');
        this.getTasks();
      }, complete: () => { },
      error: error => {
        console.error(error);
      }
    });
  }

  getPriorityTasksCount(priority: string) {
    return this.tasks.filter(f => f.priority === priority).length || 0;
  }

  getDueDateStatus(dueDate: string): { status: string; cssClass: string } {
    const today = new Date();
    const dueDateValue = new Date(dueDate);
  
    // Calculate the difference in days between today and the due date
    const timeDiff = dueDateValue.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (diffDays < 0) {
      return { status: 'Overdue', cssClass: 'overdue' };
    } else if (diffDays === 0) {
      return { status: 'Due Today', cssClass: 'due-today' };
    } else if (diffDays <= 3) {
      return { status: 'Due Soon', cssClass: 'due-soon' };
    } else {
      return { status: 'Upcoming', cssClass: 'upcoming' };
    }
  }

  // getDueDateStatus(dueDate: Date): string {
  //   const today = new Date();
  //   const dueDateValue = new Date(dueDate);
  
  //   // Calculate the difference in days between today and the due date
  //   const timeDiff = dueDateValue.getTime() - today.getTime();
  //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  //   if (diffDays < 0) {
  //     return 'Overdue';
  //   } else if (diffDays === 0) {
  //     return 'Due Today';
  //   } else if (diffDays <= 7) {
  //     return 'Due Soon';
  //   } else {
  //     return 'Upcoming';
  //   }
  // }

  // getDueDateStatus(dueDate: string): string {
  //   const today = new Date();
  //   const dueDateValue = new Date(dueDate);
  
  //   // Calculate the difference in days between today and the due date
  //   const timeDiff = dueDateValue.getTime() - today.getTime();
  //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  //   if (diffDays < 0) {
  //     return 'Overdue';
  //   } else if (diffDays === 0) {
  //     return 'Due Today';
  //   } else if (diffDays <= 7) {
  //     return 'Due Soon';
  //   } else {
  //     return 'Upcoming';
  //   }
  // }
}
