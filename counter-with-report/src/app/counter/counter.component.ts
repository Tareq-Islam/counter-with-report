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
    let header = this._headers(id);
    this._api.getCounts(header).subscribe(
      res => {
        this.counter.numeric = res.intValue || '0';
        this.counter.float = res.floatVlaue || '0';
        this.counter.alpanumeric = res.stringValue || '0';
        console.log(res);        
      }
    );
  }

  private _headers(id) {
    let headers = new HttpHeaders({
      'Id':  `${id}`,
      'IsNumActive': `${this.userInput.isNum}`,
      'IsStrActive': `${this.userInput.isAlpa}`,
      'IsFltActive': `${this.userInput.isFloat}`
    });
    return headers;
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
    this._router.navigate(['/report', this.id]);
  }

  

}
