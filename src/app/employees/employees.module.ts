import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [EmployeesListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[EmployeesListComponent]
})
export class EmployeesModule { }
