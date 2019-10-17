import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  public getData(url) {
    return this.httpClient.get(url);
  }
}
