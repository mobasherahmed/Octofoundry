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
  constructor(private _toggleState:SharedDataService){
    this.toggleFilterComp = _toggleState.toggleFilterComp.asObservable();
  }

}
