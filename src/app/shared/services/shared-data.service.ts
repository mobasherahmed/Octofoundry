import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { employess } from '../mock/mock_data';


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
    // return this.http.get<any>(url);
   let obj = {
      "af": {
          "name": "Afghanistan",
          "alpha2Code": "AF",
          "alpha3Code": "AFG",
          
      },
      "ss": {
          "name": "sksks",
          "alpha2Code": "wk",
          "alpha3Code": "wu",
          
      }
    }

    return of(obj);
  }
}
