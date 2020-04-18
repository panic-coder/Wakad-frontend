import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public baseUrl: string = environment.baseUrl;

  public postRequest(url, formData): Observable<{}> {
    var finalUrl = this.baseUrl + url;
    return this.http.post<any>(finalUrl, formData);
  }

  public getRequest(option): Observable<{}> {
    option.url = this.baseUrl + option.url;
    return this.http.get<any>(option.url);
  }

  public deleteRequest(option): Observable<{}> {
    option.url = this.baseUrl + option.url;
    const sendData = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: option.body
    };
    return this.http.delete<any>(option.url, sendData);
  }

  public getRequestWithParams(option): Observable<{}> {
    option.url = this.baseUrl + option.url + '/' + option.id;
    return this.http.get<any>(option.url);
  }

  public  putRequest(url, formData): Observable<{}> {
    var finalUrl = this.baseUrl + url;
    return this.http.put<any>(finalUrl, formData);
  }

}
