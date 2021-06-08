import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { TestApiService } from '../core/api/test-api.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  updateSubscription: Subscription;
  counter = {
    numeric: 0,
    alpanumeric: '0',
    float: 0
  };

  userInput = {
    isNum: false,
    isAlpa: false,
    isFloat: false,
    fileSize: 0
  }

  id: string;
  isStart = false;
  constructor(private _api: TestApiService) {}

  ngOnInit(): void {
   
  }

  startCount() {
    this._api.onStart().subscribe(res => {this.id = res.id; this.isStart = true; this.onRecall()});
  }

  stopCount() {
    this.isStart = false;
    console.log('stop');
  }

  updateCount() {
    this._api.getCounts(this._header()).subscribe(
      res => {
        this.counter.numeric = Number(res.intValue) || 0;
        this.counter.float = Number(res.floatVlaue) || 0;
        this.counter.alpanumeric = res.stringValue.toString() || '0';
        console.log(res);        
      }
    );
  }

  onRecall() {
    const interval = timer(0, 1000);
    this.updateSubscription = interval.subscribe(
      res => {
        if (this.isStart) {
          this.updateCount();
        }
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
