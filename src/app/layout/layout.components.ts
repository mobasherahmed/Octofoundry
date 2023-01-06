import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filtersI } from '../shared/interfaces/interfaces';
import { SharedDataService } from '../shared/services/shared-data.service';

@Component({
  selector: 'app-layout',
  template: `
    <div class="container-fluid my-2 p-4">
        <div class="row">
            <div class="col-md-2 animate__animated animate__fadeInLeft" *ngIf="toggleFilterComp | async">
                <app-filter (filters)="setFilters($event)"></app-filter>
            </div>
            <div class="col-md-10" [class.col-md-12]="!(toggleFilterComp | async)">
                <app-employees-list [filters]="filters"></app-employees-list>
            </div>
        </div>
   </div>`,
})
export class LayoutComponent {
 
  toggleFilterComp:Observable<boolean> = new Observable();
  filters!:filtersI;
 
  constructor(private _toggleState:SharedDataService){
    this.toggleFilterComp = _toggleState.toggleFilterComp.asObservable();
  }

  setFilters(filters:any){
    this.filters = filters
  }
 

}
