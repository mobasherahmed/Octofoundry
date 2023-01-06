import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { employeeI, filtersI } from 'src/app/shared/interfaces/interfaces';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['name','phone','email','date','company','country'];
  data!: employeeI[];
  dataSource: MatTableDataSource<employeeI>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() filters!:filtersI;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private _employeeServ:SharedDataService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(): void{
    this.filterEmployees()
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  

  filterEmployees(){
    if(this.filters && Object.keys(this.filters).length > 0){
      const arr : employeeI[] = []
     
      for(let key in this.filters){
        // to avoid typescript err of No index signature with a parameter of type 'string' was found on type..
        // @ts-ignore
        if(this.filters[key].length > 0){
          const searchKey = String(key).toLocaleLowerCase();
          // @ts-ignore
          const filterations = this.data.filter((res:any)=>res[searchKey].includes(this.filters[key]))
          arr.push(...filterations); 
        }
        
      }      
      this.createMatTableData(arr);
    }
  }

  getEmployees(){
   this._employeeServ.getEmployees()
   .pipe(takeUntil(this.unsubscribe$))
   .subscribe(res=>{
    this.data = res;
    this.createMatTableData(res);
   });
  }

  createMatTableData(arr:any){
    this.dataSource = new MatTableDataSource(arr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


