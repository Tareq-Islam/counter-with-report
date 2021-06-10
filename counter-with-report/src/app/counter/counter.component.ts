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
    this._api.onStart().subscribe(res => {this.id = res.id; this.isStart = true; this.onRecall(res.id)});
  }

  stopCount() {
    this.isStart = false;
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    console.log('stop');
  }

  updateCount(id) {
    let header = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
    });
    header.set('Id', id);
    header.set('IsNumActive', `${this.userInput.isNum}`);
    header.set('IsStrActive', `${this.userInput.isAlpa}`);
    header.set('IsFltActive', `${this.userInput.isFloat}`);
    this._api.getCounts(header).subscribe(
      res => {
        this.counter.numeric = res.intValue || '0';
        this.counter.float = res.floatVlaue || '0';
        this.counter.alpanumeric = res.stringValue.toString() || '0';
        console.log(res);        
      }
    );
  }

  onRecall(id) {
    const interval = timer(0, 1000);
    this.updateSubscription = interval.subscribe(
      res => {
        if (this.isStart) {
          this.updateCount(id);
        }
      }
    );
  }

  generateReports() {
    this._router.navigate(['/report', { id: this.id }]);
  }

  

}
