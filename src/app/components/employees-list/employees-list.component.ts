import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { employee } from 'src/app/employee.interface';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['name','phone','email','date','company','country'];
  dataSource: MatTableDataSource<employee>;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private _employeeServ:SharedDataService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
   this._employeeServ.getEmployees()
   .pipe(takeUntil(this.unsubscribe$))
   .subscribe(res=>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleFilter(){
    const prevState = this._employeeServ.toggleFilterComp.getValue();
    this._employeeServ.toggleFilterComp.next(!prevState);
  }

  ngOnDestroy(){
   this.unsubscribe$.next(true);
  }
}


