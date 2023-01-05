import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { config } from './config';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  seedData = config;
  dynamicForm: FormGroup;
  params:any={};
  unsubscribe$: Subject<boolean> = new Subject();
  constructor(private _Service:SharedDataService,private fb: FormBuilder,private _route: ActivatedRoute,
    private _router: Router) {
    this.dynamicForm = this.fb.group({
      filters: this.fb.array([])
    });
    this.getParams();

  }
 
  ngOnInit() {
    this.seedFiltersFormArray();
  }
  
  getParams(){
    this._route.queryParams.pipe(takeUntil(this.unsubscribe$),tap(p=>console.log(p))).subscribe(params=> this.params = params)
  }

 

   seedFiltersFormArray() {
    this.seedData.forEach((seedDatum:any) => {
      const key = seedDatum.title;
      // const value = params ? params[key] : '';
      const formGroup = this.addFormControls(seedDatum.title,seedDatum.type);
      if(seedDatum.type === 'dropdown'){
       const options = this.getOptions(seedDatum.url);
       formGroup.addControl('Options',this.fb.control(options))
      }
      this.filtersFormArray.push(formGroup);
    });
    console.log(" this.filtersFormArray", this.filtersFormArray);
    
  }

  addFormControls(name:string,type:string){
    const formGroup = this.fb.group({});
    formGroup.addControl('ControlName',this.fb.control(name))
    formGroup.addControl('Type',this.fb.control(type))
    formGroup.addControl('Value',this.fb.control(this.getControlValue(name)))
    return formGroup;
  }

  getControlValue(name:string){
    console.log("this.params",this.params);
    return this.params[name];
  }

  getOptions(url:string){
    // this._Service.getCountries(url).subscribe(res=>console.log)
    return [{name:'Egypt',Alpha3Code:'EGP'}]
  }


  submit() {
    let params:any = {};
    this.dynamicForm.value.filters.forEach((filter:any) => params[filter.ControlName] = filter.Value); 
     
    // changes the route without moving from the current view or
     // triggering a navigation event,
     this._router.navigate([''], {
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
