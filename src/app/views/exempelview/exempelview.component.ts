import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-exempelview',
  templateUrl: './exempelview.component.html',
  styleUrls: ['./exempelview.component.scss']
})
export class ExempelviewComponent implements AfterViewInit {
  API_KEY = 'aa0ec23a628149509f29f44b5abc32cb';
  demourl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`;
  articles;
  farmenurl = '/farmen/atg/atgtypStatus';
  constructor(private apiService: ApiService) { }
  ngAfterViewInit() {
    // exempel externa tjanst GET
    this.apiService.getData(this.demourl).subscribe((data) => {
      this.articles = data['articles'];
    });
    // exempel interna tjanst farmen backend GET konfigurerat i proxy.conf.json
    this.apiService.getData(this.farmenurl).subscribe((data) => {
      console.log(data);
    });
  }

}
