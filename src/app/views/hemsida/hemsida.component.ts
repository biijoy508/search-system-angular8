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
  showSpinner = false;
  resultatStatusText = 'Välj sökfilter och klicka på sök för att visa resultat';
  spinnerText = 'Sidan laddas';
  arendeLista: Arende[] = [];
  sokFaltValuesHolder: SokFaltValues = {
    stodAr: [''],
    arendeTyp: [''],
    ansokansTyp: ['']
  };

  sokFilter: SokFilter = {
    kundNummerBokstav: '',
    kundNummer: '',
    stodAr: '',
    arendeTyp: '',
    ansokansTyp: ''
  };

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
    this.hamtaStodarFranIntrModule();
    this.hamtaArendetyperFranArendeModule();
    this.hamtaAnsokanstyperFranArendeModule();
  }

  hamtaArendetyperFranArendeModule() {
    this.apiService.getData(environment.arendeTyperUrl).subscribe((data: any) => {
      this.sokFaltValuesHolder.arendeTyp.length = 0;
      for (let i = 0; i < data.length; i++) {
        this.sokFaltValuesHolder.arendeTyp.push(data[i].kod);
      }
    });
  }

  hamtaAnsokanstyperFranArendeModule() {
    this.apiService.getData(environment.ansokanTyperUrl).subscribe((data: any) => {
      this.sokFaltValuesHolder.ansokansTyp.length = 0;
      for (let i = 0; i < data.length; i++) {
        this.sokFaltValuesHolder.ansokansTyp.push(data[i].kod);
      }
    });
  }

  hamtaStodarFranIntrModule() {
    this.apiService.getData(environment.stodarUrl).subscribe((data: any) => {
      this.sokFaltValuesHolder.stodAr.length = 0;
      for (let i = 0; i < data.length; i++) {
        this.sokFaltValuesHolder.stodAr.push(data[i]);
      }
    });
  }

  hamtaSokResultatFranArendeModule() {
    const urlParameter = {
      kundnummerbokstav: this.sokFilter.kundNummerBokstav,
      kundnummer: this.sokFilter.kundNummer,
      stodar: this.sokFilter.stodAr,
      arendetyp: this.sokFilter.arendeTyp,
      ansokanstyp: this.sokFilter.ansokansTyp
    };

    this.apiService.getDataMedParametrar(environment.aredatArendenUrl, urlParameter).subscribe((data: Arende[]) => {
      this.arendeLista.length = 0;
      if (data.length === 0) {
        this.noresult = false;
        this.resultatStatusText = 'Sökningen gav inga resultat';
      } else {
        this.noresult = true;
      }
      for (let i = 0; i < data.length; i++) {
        this.arendeLista.push(data[i]);
      }
      this.showSpinner = false;
    });
  }
  confirmbtnClick() {
    this.showSpinner = true;
    this.spinnerText = 'Ärenden hämtas';
    return new Promise(() => {
      this.hamtaSokResultatFranArendeModule();
    });
  }
}
