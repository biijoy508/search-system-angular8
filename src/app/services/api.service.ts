import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
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

  public getChainedDataArendeInformation(arendeId, kundNummer, stodAr): Observable<any> {

    const arendeversionIdParam = {
      arendeid: arendeId,
      kundnummer: kundNummer
    };

    const arendeIdParam = {
      arendeid: arendeId
    };

    const stodArParam = {
      stodar: stodAr
    };

    const response1 = this.httpClient.get(environment.arendenUrl, { params: arendeIdParam });
    const response2 = this.httpClient.get(environment.atgarderUrl, { params: arendeIdParam });
    const response3 = this.httpClient.get(environment.atgardskoderUrl, { params: stodArParam })
    const response4 = this.httpClient.get(environment.arendeVersionerUrl, { params: arendeIdParam });

    return this.httpClient.get(environment.arendeVersionIdUrl, { params: arendeversionIdParam })
      .pipe(
        concatMap(
          arendeversionId =>
            <Observable<any>>(
              forkJoin([this.httpClient.get(`${environment.ansokanDjurvalfardUrl}/${arendeversionId}`), response1,
              response2, response3, response4])
                .pipe(
                  map(data => ({
                    arendeversionId: arendeversionId,
                    data: data
                  }))
                )
            )
        )
      );

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
