import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private httpClient: HttpClient) {

  }

  public getChainedData(): Observable<any> {
    const response1 = this.httpClient.get(environment.stodArUrl);
    const response2 = this.httpClient.get(environment.arendeTyperUrl);
    const response3 = this.httpClient.get(environment.ansokansTyperUrl);
    return forkJoin([response1, response2, response3]);
  }

  public getData(url) {
    return this.httpClient.get(url);
  }

  public getDataMedParametrar(url, parameters) {
    return this.httpClient.get(url, { params: parameters });
  }

  public postData(url, data) {
    return this.httpClient.post<any>(url, data);
  }

}
