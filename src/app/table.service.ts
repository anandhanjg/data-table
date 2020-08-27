import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http:HttpClient) { }

  getHeader(headers):HttpHeaders{
    let httpHeader=new HttpHeaders();
    Object.keys(headers).forEach(key=>{
      httpHeader.set(key,headers[key]);
    });
    return httpHeader;
  }

  getData(url:string,options,headers):Observable<any>{
      return this.http.post<any>(url,options,{headers:this.getHeader(headers)}).pipe(map(r=>r));
  }

}
