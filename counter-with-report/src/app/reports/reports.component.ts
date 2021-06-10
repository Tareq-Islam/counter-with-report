import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestApiService } from '../core/api/test-api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reportId: any;
  reports = [];
  constructor(
    private _api: TestApiService,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    const reportId = this._router.snapshot.params.id;
    this.getReport(reportId);
  }

  getReport(id) {
    let header = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Id': `${id}`
    });
    this._api.getReport(header).subscribe(
      res => {
        this.reports = res;
      }
    );
  }

}
