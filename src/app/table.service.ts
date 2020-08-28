import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http:HttpClient) { }

  getData(url:string,options,headers):Observable<any>{
      return this.http.post<any>(url,options,{headers:new HttpHeaders(headers)}).pipe(map(r=>r));
  }

}
