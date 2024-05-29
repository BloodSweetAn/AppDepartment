import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './component/department/department.component';
import { CreateEditComponent } from './component/department/create-edit/create-edit.component';
import { DepartmentListComponent } from './component/department/department-list/department-list.component';

const routes: Routes = [
  {
    path: 'departments', component: DepartmentComponent, children: [
      {
      path:'nuevo', component: CreateEditComponent
      },
      {
        path:'listado', component: DepartmentListComponent
      },
      {
        path:'edicion/:gcId', component: CreateEditComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
