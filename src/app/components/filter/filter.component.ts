import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { config } from './config';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterTypes = [
    'text',
    'select',
    'date'
  ];

  apiTypes = [
    'Less Than',
    'Equals',
    'Greater Than'
  ];

  seedData = config;

  // @ts-ignore
  dynamicForm: FormGroup;

  form!: FormGroup;
  payLoad = '';

  
  constructor(private fb: FormBuilder) {}
 
  toFormGroup(questions: any ) {
    const group: any = {};

    questions.forEach((question:any) => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });

    return new FormGroup(group);
  }

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      filters: this.fb.array([])
    });

    this.seedFiltersFormArray();
    this.form = this.toFormGroup(this.seedData);

  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  // get isValid() { return this.form.controls[this.question.key].valid;

  seedFiltersFormArray() {
    this.seedData.forEach((seedDatum:any) => {
      console.log("seedDatum",seedDatum);
      const formGroup = this.createFilterGroup();
      const formControl = this.createFilterControl();
      this.filtersFormArray.push(formControl);
      console.log("this.filtersFormArray",this.filtersFormArray);
      
    });
  }

  createFilterGroup() {
    return this.fb.group({
      title: [],
    });
  }

  createFilterControl(){
    return new FormControl('');
  }

  getOptions(){
    return [{id:1,name:'s'}]
  }


  save() {
    console.log(this.dynamicForm.value);
  }

  get filtersFormArray() {
    return (<FormArray>this.dynamicForm.get('filters'));
  }



}
