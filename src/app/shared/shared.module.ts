import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrashIconComponent } from './trash-icon/trash-icon.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
    imports: [CommonModule,
        FormsModule,
        RouterModule],
    exports: [TrashIconComponent, SpinnerComponent],
    declarations: [
        TrashIconComponent, SpinnerComponent
    ],
    providers: [],
})
export class SharedModule { }
