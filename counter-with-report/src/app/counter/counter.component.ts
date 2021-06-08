import { Component, OnInit } from '@angular/core';
import { TestApiService } from '../core/api/test-api.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor(private _api: TestApiService) {}
  ngOnInit(): void {
   
  }

  startCount() {
    this._api.onStart().subscribe(res => console.log(res));
  }

  stopCount() {
    console.log('stop');
  }

  updateCount() {
    console.log('update');
  }

  generateReports() {
    console.log('report');
  }

  private _header() {}

}
