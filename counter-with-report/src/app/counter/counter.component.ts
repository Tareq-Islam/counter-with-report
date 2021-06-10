import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private _api: TestApiService, private _router: Router) {}

  ngOnInit(): void {
   
  }

  startCount() {
    this._api.onStart().subscribe(res => {this.id = res.id; this.isStart = true; this.onRecall()});
  }

  stopCount() {
    this.isStart = false;
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    console.log('stop');
  }

  updateCount() {
    let header = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
    });
    header.append('Id', this.id);
    header.append('IsNumActive', `${this.userInput.isNum}`);
    header.append('IsStrActive', `${this.userInput.isAlpa}`);
    header.append('IsFltActive', `${this.userInput.isFloat}`);
    this._api.getCounts(header).subscribe(
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
    this._router.navigate(['/report', { id: this.id }]);
  }

  

}
