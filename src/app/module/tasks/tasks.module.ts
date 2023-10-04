import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule, taskRoutedComponents } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { EditComponent } from './edit/edit.component';


@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TasksRoutingModule,
        AccordionModule.forRoot(),
        SharedModule],
    exports: [],
    declarations: [
        taskRoutedComponents,
        EditComponent
    ],
    providers: [],
})
export class TasksModule { }
