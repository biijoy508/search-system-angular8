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

  public getChainedDataMassHantering(): Observable<any> {
    const response1 = this.httpClient.get(environment.myndigheterUrl);
    const response2 = this.httpClient.get(environment.stodArUrl);
    const response3 = this.httpClient.get(environment.arendeTyperUrl);
    const response4 = this.httpClient.get(environment.ansokansTyperUrl);
    const response5 = this.httpClient.get(environment.statusUrl);
    return forkJoin([response1, response2, response3, response4, response5]);
  }

  public getChainedDataArenden(sokFilter): Observable<any> {
    const response1 = this.httpClient.post<any>(environment.arendenUrl, sokFilter);
    const response2 = this.httpClient.post<any>(environment.antalArendenUrl, sokFilter);
    return forkJoin([response1, response2]);
  }

  public getChainedDataArendeInformation(arendeId, stodAr): Observable<any> {

    console.log(stodAr);

    const arendeIdParam = {
      arendeid: arendeId
    };

    const stodArParam = {
      stodar: stodAr
    }

    const response1 = this.httpClient.get(environment.arendenUrl, { params: arendeIdParam });
    const response2 = this.httpClient.get(environment.atgarderUrl, { params: arendeIdParam });
    const response3 = this.httpClient.get(environment.atgardskoderUrl, { params: stodArParam });
    return forkJoin([response1, response2, response3]);
  }

  public getData(url) {
    return this.httpClient.get(url);
  }

  public getDataMedParametrar(url, parameters) {
    return this.httpClient.get(url, { params: parameters });
  }

  public postData(url, data): Observable<any> {
    return this.httpClient.post<any>(url, data);
  }

}
