
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from 'src/app/service/task.service';
import { validateAllFormFields } from 'src/app/service/validateAllFormFields';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  taskForm!: FormGroup;
  userId = 'LSC';



  constructor(private formBuilder: FormBuilder, private taskService: TasksService,
    private router: Router,
    private toastrService: ToastrService) { }

  isFieldInvalid(field: string): boolean | undefined {
    const control = this.taskForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }


  ngOnInit(): void {
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

  createTask(): void {
    validateAllFormFields(this.taskForm);
    if (this.taskForm.invalid) {
      return;
    }
    
    this.taskService.CreateTask(this.taskForm.value).subscribe({
      next: value => {
        this.toastrService.success('Success','Task Created');
        this.goToTasks();
      }, complete: () => { this.taskForm.reset(); },
      error: error => {
        console.error(error);
      }
    });

  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

}
