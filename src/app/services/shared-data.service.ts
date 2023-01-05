import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { employess } from '../mock_data';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  toggleFilterComp:BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor() { }

  getEmployees():Observable<any>{
    return of(employess);
  }
}
