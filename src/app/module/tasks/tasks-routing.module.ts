import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
  {
    path: 'view', component: ViewComponent
  },
  {
    path: 'create', component: CreateComponent
  },
  {
    path: 'edit/:taskId', component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }

export const taskRoutedComponents = [
  ViewComponent,
  CreateComponent
];
