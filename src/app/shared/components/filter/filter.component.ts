import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil} from 'rxjs';
import { configI } from 'src/app/shared/interfaces/interfaces';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { config } from './config';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  seedData:configI[] = config;
  dynamicForm: FormGroup;
  unsubscribe$: Subject<boolean> = new Subject();
  @Output() filters = new EventEmitter<{}>();
  
  constructor(private _Service:SharedDataService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.dynamicForm = this.fb.group({
      filters: this.fb.array([])
    });
  }
 
  ngOnInit() {
    this.seedFiltersFormArray();
    this.getParams();
  }
  
  getParams(){
    this._route.queryParams.pipe(takeUntil(this.unsubscribe$))
    .subscribe(params=>
    this.filtersFormArray.controls.forEach(form=>this.doSwitch(form,params)));
  } 

  doSwitch(form:any,params:any){
    const control = form.get('ControlName')?.value;
    switch(control){
      case 'Email':{
        form.get('Value')?.setValue(params.Email);
        break;
      }
      case 'Phone':{
        form.get('Value')?.setValue(params.Phone);
        break;
      }
      case 'Name':{
        form.get('Value')?.setValue(params.Name);
        break;
      }
      case 'Company':{
        form.get('Value')?.setValue(params.Company);
        break;
      }
      case 'country':{
        form.get('Value')?.setValue(params.country);
        break;
      }
      case 'Date':{
        form.get('Value')?.setValue(params.Date);
        break;
      }
      default:{
        break;
      }
    }
  }

  seedFiltersFormArray() {
    this.seedData.forEach((seedDatum:any) => {
      const formGroup = this.addFormControls(seedDatum.title,seedDatum.type);
      if(seedDatum.type === 'dropdown'){
       const options = this.getOptions(seedDatum.url);
       formGroup.addControl('Options',this.fb.control(options))
      }
      this.filtersFormArray.push(formGroup);
    });
  }

  addFormControls(name:string,type:string){
    const formGroup = this.fb.group({});
    formGroup.addControl('ControlName',this.fb.control(name))
    formGroup.addControl('Type',this.fb.control(type))
    formGroup.addControl('Value',this.fb.control(''))
    return formGroup;
  }

  getOptions(url:string){
    // this._Service.getCountries(url).subscribe(res=>console.log)
    return [{name:'Egypt',Alpha3Code:'EGP'}]
  }
  
  submit() {
    let params:any = {};
    this.dynamicForm.value.filters.forEach((filter:any) => 
    params[filter.ControlName] = filter.Value != undefined ? String(filter.Value).trim() : ''); 
    this.addQueryParams(params);
    //example of using output decorator to share data between components..
    this.filters.emit(params);
   
  }

  addQueryParams(params:any){
    // changes the route without moving from the current view or
     // triggering a navigation event,
     this._router.navigate(['/employees'], {
      relativeTo: this._route,
      queryParams: params,
      // preserve the existing query params in the route
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  get filtersFormArray() {
    return (<FormArray>this.dynamicForm.get('filters'));
  }

  ngOnDestroy(){
    this.unsubscribe$.next(true);
  }

}
