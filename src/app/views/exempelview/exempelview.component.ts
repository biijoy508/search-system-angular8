import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-exempelview',
  templateUrl: './exempelview.component.html',
  styleUrls: ['./exempelview.component.scss']
})
export class ExempelviewComponent implements OnInit {
  API_KEY = 'aa0ec23a628149509f29f44b5abc32cb';
  url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`;
  articles;
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.getData(this.url).subscribe((data) => {
      console.log(data);
      this.articles = data['articles'];
    });
  }

}
