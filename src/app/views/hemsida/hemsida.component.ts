import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

interface Arende {
  kundNummerBokstav: string;
  kundNummer: string;
  kundNamn: string;
  stodAr: string;
  arendeTyp: string;
  ansokansTyp: string;
  status: string;
  arendeNummer: string;
}

interface SokFaltValues {
  stodAr: string[];
  arendeTyp: string[];
  ansokansTyp: string[];
}

interface SokFilter {
  kundNummerBokstav: string;
  kundNummer: string;
  stodAr: string;
  arendeTyp: string;
  ansokansTyp: string;
}

@Component({
  selector: 'app-hemsida',
  templateUrl: './hemsida.component.html',
  styleUrls: ['./hemsida.component.scss']
})

export class HemsidaComponent implements AfterViewInit {
  noresult = false;
  arendeLista: Arende[] = [];
  sokFaltValuesHolder: SokFaltValues = {
    stodAr: [''],
    arendeTyp: [''],
    ansokansTyp: ['']
  };

  sokFilter: SokFilter = {
    kundNummerBokstav: null,
    kundNummer: null,
    stodAr: null,
    arendeTyp: null,
    ansokansTyp: null
  };

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
     this.hamtaArendetyperFranArendeModule();
     this.hamtaAnsokanstyperFranArendeModule();
     this.hamtaStodarFranIntrModule();
  }

  hamtaArendetyperFranArendeModule() {
    this.apiService.getData(environment.arendeTyperUrl).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.sokFaltValuesHolder.arendeTyp.push(data[i].kod);
      }
    });
  }

  hamtaAnsokanstyperFranArendeModule() {
    this.apiService.getData(environment.ansokanTyperUrl).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.sokFaltValuesHolder.ansokansTyp.push(data[i].kod);
      }
    });
  }

  hamtaStodarFranIntrModule() {
    this.apiService.getData(environment.stodarUrl).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.sokFaltValuesHolder.stodAr.push(data[i]);
      }
    });
  }

  hamtaSokResultatFranArendemodule() {
    const urlParameter = {
      kundnummerbokstav: this.sokFilter.kundNummerBokstav,
      kundnummer: this.sokFilter.kundNummer,
      stodar: this.sokFilter.stodAr,
      arendetyp: this.sokFilter.arendeTyp,
      ansokanstyp: this.sokFilter.ansokansTyp
    };

    this.apiService.getDataMedParametrar(environment.aredatArendenUrl, urlParameter).subscribe((data: Arende[]) => {
      for (let i = 0; i < data.length; i++) {
        this.arendeLista.push(data[i]);
      }
    });
  }
  confirmbtnClick() {
    this.noresult = true;
    console.log(this.sokFilter);
    return new Promise(() => {
      this.hamtaSokResultatFranArendemodule();
    });
  }
}
