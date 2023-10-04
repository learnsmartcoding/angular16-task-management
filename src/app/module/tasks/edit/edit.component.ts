import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Attachment, Subtask, TasksDocument } from 'src/app/models/tasks-document';
import { TasksService } from 'src/app/service/task.service';
import { validateAllFormFields } from 'src/app/service/validateAllFormFields';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  taskId!: string;
  userId = 'LSC';
  taskDocument!: TasksDocument;
  taskForm!: FormGroup;

  constructor(private route: ActivatedRoute, private taskService: TasksService,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('taskId') || '';
      this.buildForm();
    });
  }

  buildForm() {
    this.taskForm = this.formBuilder.group({
      id: [''],
      taskId: [''],
      userId: [this.userId, Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      labels: this.formBuilder.array([]),
      attachments: this.formBuilder.array([]),
      subtasks: this.formBuilder.array([])
    });
    // Fetch task details using the task ID
    this.getTask();
  }

  getTask() {
    this.taskService.GetTask(this.userId, this.taskId).subscribe(
      {
        next: value => {
          this.taskDocument = value;
          this.patchTaskData();
        }, complete: () => { },
        error: error => {
          if (error.status === 404) {
            this.toastrService.info('No such task found, please select from Task list', 'Incorrect Task');
            this.goToTasks();
          } else {
            console.error(error);
          }
        }
      });
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  patchAttachments(attachments: Attachment[]): FormGroup[] {
    const attachmentFormGroups: FormGroup[] = [];
    for (const attachment of attachments) {
      const attachmentFormGroup = this.formBuilder.group({
        id: [attachment.id],
        fileName: [attachment.fileName],
        url: [attachment.url]
      });
      attachmentFormGroups.push(attachmentFormGroup);
    }
    return attachmentFormGroups;
  }

  isFieldInvalid(field: string): boolean | undefined {
    const control = this.taskForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }


  patchSubtasks(subtasks: Subtask[]): FormGroup[] {

    const subtaskFormGroups: FormGroup[] = [];
    for (const subtask of subtasks) {
      const subtaskFormGroup = this.formBuilder.group({
        id: [subtask.id],
        title: [subtask.title, Validators.required],
        status: [subtask.status, Validators.required]
      });
      subtaskFormGroups.push(subtaskFormGroup);
    }
    return subtaskFormGroups;
  }

  patchTaskData() {
    const retrievedTaskData = this.taskDocument;

    // Patch the task data into the form
    this.taskForm.patchValue({
      id: retrievedTaskData.id,
      taskId: retrievedTaskData.taskId,
      userId: retrievedTaskData.userId,
      title: retrievedTaskData.title,
      description: retrievedTaskData.description,
      dueDate: new Date(retrievedTaskData.dueDate).toISOString().substring(0, 10), // Convert to Date object
      status: retrievedTaskData.status,
      priority: retrievedTaskData.priority
    });

    // Patch labels
    const labelFormArray = this.taskForm.get('labels') as FormArray;
    retrievedTaskData.labels.forEach((label: string) => {
      labelFormArray.push(this.formBuilder.control(label));
    });

    // Patch attachments
    const attachmentFormArray = this.taskForm.get('attachments') as FormArray;
    retrievedTaskData.attachments.forEach((attachment: Attachment) => {
      attachmentFormArray.push(
        this.formBuilder.group({
          id: attachment.id,
          fileName: attachment.fileName,
          url: attachment.url
        })
      );
    });

    // Patch subtasks
    const subtaskFormArray = this.taskForm.get('subtasks') as FormArray;
    retrievedTaskData.subtasks.forEach((subtask: Subtask) => {
      subtaskFormArray.push(
        this.formBuilder.group({
          id: subtask.id,
          title: subtask.title,
          status: subtask.status
        })
      );
    });
  }



  get labelControls(): FormArray {
    return this.taskForm.get('labels') as FormArray;
  }

  get attachmentControls(): FormArray {
    return this.taskForm.get('attachments') as FormArray;
  }

  getSubtaskStatusControlName(index: number) {
    return `${index}.status`;
  }

  get subtaskControls(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addLabel(): void {
    this.labelControls.push(this.formBuilder.control(''));
  }

  removeLabel(index: number): void {
    this.labelControls.removeAt(index);
  }

  addAttachment(): void {
    this.attachmentControls.push(
      this.formBuilder.group({
        id: [''],
        fileName: [''],
        url: ['']
      })
    );
  }

  removeAttachment(index: number): void {
    this.attachmentControls.removeAt(index);
  }

  addSubtask() {
    const subtaskGroup = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.subtaskControls.push(subtaskGroup);
  }

  isSubtaskFieldInvalid(subtaskIndex: number, fieldName: string) {
    const subtaskGroup = this.subtaskControls.at(subtaskIndex) as FormGroup;
    const field = subtaskGroup.get(fieldName) as AbstractControl;
    return field.invalid && (field.dirty || field.touched);
  }


  removeSubtask(index: number): void {
    this.subtaskControls.removeAt(index);
  }
  updateTask() {
    validateAllFormFields(this.taskForm);
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService.UpdateTask(this.taskForm.value).subscribe({
      next: value => {
        this.toastrService.success('Success', 'Task Updated');
        this.goToTasks();
      }, complete: () => { this.taskForm.reset(); },
      error: error => {
        if(error.status===400){
        this.toastrService.info('some data is incorrect, please correct and try again', 'Incomplete Task');
        } else{
        console.error(error);
        }
      }
    });
  }

  getLimitedText(task:TasksDocument | undefined | null) {
    return (task && task.title.length > 25) ? `${task.title.substring(0, 25)}...` : task?.title;
  }
}
