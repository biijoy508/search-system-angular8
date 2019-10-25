import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

interface Arende {
  kundnr: String;
  namn: String;
  stodar: String;
  arendeTyp: String;
  ansokansTyp: String;
  status: String;
  arendenr: String;
}
@Component({
  selector: 'app-hemsida',
  templateUrl: './hemsida.component.html',
  styleUrls: ['./hemsida.component.scss']
})

export class HemsidaComponent implements OnInit {
  arendetyp = '';
  stodar = '';
  anstyp = '';
  noresult = false;
  arendetypValues = ['FARERS', 'SUGGERS', 'KLOVERS'];
  stodarValues = ['2019', '2018', '2017', '2016'];
  anstypValues = ['ÅTAG', 'UTBET'];

  arendeLista: Arende[] = [{
    kundnr: '1',
    namn: 'Str2ing',
    stodar: 'Str3ing',
    arendeTyp: 'Str4ing',
    ansokansTyp: 'St5ring',
    status: 'Str6ing',
    arendenr: 'St7ring'
  }, {
      kundnr: '2',
      namn: 'Str2ing',
      stodar: 'Str3ing',
      arendeTyp: 'Str4ing',
      ansokansTyp: 'St5ring',
      status: 'Str6ing',
      arendenr: 'St7ring'
    }];

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }
  confirmbtnClick() {
    this.noresult = !this.noresult;
  }

}
