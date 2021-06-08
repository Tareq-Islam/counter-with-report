import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestUrl } from '../endpoint/test-url.model';

@Injectable({
  providedIn: 'root',
})
export class TestApiService {
  private _base_url = 'https://localhost:44330';
  constructor(
    private _http: HttpClient
  ) {}

  public onStart(): Observable<any> {
    return this._http.get(`${this._base_url}/${TestUrl.start}`);
  }

  public getCounts(header: any): Observable<any> {
    console.log(header);
    return this._http.get(`${this._base_url}/${TestUrl.getCounter}`, { headers: header});
  }

  public getReport(): Observable<any> {
    return this._http.get(`${this._base_url}/${TestUrl.report}`);
  }
}
