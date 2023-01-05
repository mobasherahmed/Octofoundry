import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @Input() filters:any;
  
  data!: employee[];

  constructor(private _employeeServ:SharedDataService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(){
    console.log("ngOnChanges....");
    console.log(this.filters);
    if(Object.keys(this.filters).length > 0){      
      const email = String(this.filters.Email);
      const phone = String(this.filters.Phone);
      const name = String(this.filters.Name);
      const country = String(this.filters.country);
      const company = String(this.filters.company);
      const date = String(this.filters.date);
      const arr = this.data.filter((res:any)=>{
        if(res.email.includes(email) || res.phone.includes(phone) || res.name.includes(name)
        || res.country.includes(country) || res.company.includes(company) || res.date.includes(date)){
          return res;
        }
      })
      this.dataSource = new MatTableDataSource(arr)
      console.log(arr);
      
    }
  }
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
   this._employeeServ.getEmployees()
   .pipe(takeUntil(this.unsubscribe$))
   .subscribe(res=>{
    this.data = res;
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


