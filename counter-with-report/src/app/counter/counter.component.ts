import { Component, OnInit } from '@angular/core';
import { TestApiService } from '../core/api/test-api.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  counter = {
    numeric: 0,
    alpanumeric: 0,
    float: 0
  };

  userInput = {
    isNum: false,
    isAlpa: false,
    isFloat: false,
    fileSize: 0
  }

  id: string;

  constructor(private _api: TestApiService) {}

  ngOnInit(): void {
   
  }

  startCount() {
    this._api.onStart().subscribe(res => {this.id = res.id; this.updateCount()});
  }

  stopCount() {
    console.log('stop');
  }

  updateCount() {
    this._api.getCounts(this._header()).subscribe(
      res => {
        console.log(res);        
      }
    );
  }

  generateReports() {
    console.log('report');
  }

  private _header() {
    let headers = new Headers();
    headers.set('Id', this.id);
    headers.append('NumPercent', this.userInput.isNum.toString());
    headers.append('StrPercent', this.userInput.isAlpa.toString());
    headers.append('FltPercent', this.userInput.isFloat.toString());
    return headers;
  }

}
