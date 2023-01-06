import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { employess } from '../mock_data';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  toggleFilterComp:BehaviorSubject<boolean> = new BehaviorSubject(true);
 
  constructor(private http:HttpClient) { }

  getEmployees():Observable<any>{
    return of(employess);
  }

  getCountries(url:string):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get<any>(url);
  }
}
