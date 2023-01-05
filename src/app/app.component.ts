import { Component } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { SharedDataService } from './services/shared-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Octofoundry';
  toggleFilterComp:Observable<boolean> = new Observable();
  ngClass:string='col-md-12';
  constructor(private _toggleState:SharedDataService){
    this.toggleFilterComp = _toggleState.toggleFilterComp.asObservable();
    console.log("_toggleState.toggleFilterComp.getValue() ",_toggleState.toggleFilterComp.getValue() );
    
    this.ngClass = _toggleState.toggleFilterComp.getValue() ?  'col-md-10': 'col-md-12';
  }

}
