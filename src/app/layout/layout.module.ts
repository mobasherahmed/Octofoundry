import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeesModule } from '../employees/employees.module';
import { LayoutComponent } from './layout.components';
import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeesModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
