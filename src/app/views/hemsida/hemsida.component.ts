import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

interface Arende {
  kundNummerAlfaNumerisk: string;
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
  antalArenden = '';
  arendeLista: Arende[] = [];
  noResults = true;
  resultatStatusText = 'Välj sökfilter och klicka på sök för att visa resultat';
  showSpinner = true;
  spinnerText = 'Sidan laddas';

  sokFaltValuesHolder: SokFaltValues = {
    stodAr: [''],
    arendeTyp: [''],
    ansokansTyp: ['']
  };

  sokFilter: SokFilter = {
    kundNummer: '',
    stodAr: '',
    arendeTyp: '',
    ansokansTyp: ''
  };

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
    this.hamtaSokFaltValues();
  }

  hamtaSokFaltValues() {

    this.apiService.getChainedData()
      .subscribe(res => {
        this.sokFaltValuesHolder.stodAr = [''];
        for (let i = 0; i < res[0].length; i++) {
          this.sokFaltValuesHolder.stodAr.push(res[0][i]);
        }
        this.sokFaltValuesHolder.arendeTyp = [''];
        for (let i = 0; i < res[1].length; i++) {
          this.sokFaltValuesHolder.arendeTyp.push(res[1][i].kod);
        }
        this.sokFaltValuesHolder.ansokansTyp = [''];
        for (let i = 0; i < res[2].length; i++) {
          this.sokFaltValuesHolder.ansokansTyp.push(res[2][i].kod);
        }
        this.showSpinner = false;
      });

  }

  hamtaSokResultatFranArendeModule() {

    const urlParameter = {
      kundnummer: this.sokFilter.kundNummer,
      stodar: this.sokFilter.stodAr,
      arendetyp: this.sokFilter.arendeTyp,
      ansokanstyp: this.sokFilter.ansokansTyp
    };

    this.apiService.getDataMedParametrar(environment.arendenUrl, urlParameter).subscribe((data: any[]) => {
      this.arendeLista.length = 0;
      if (Object.values(data)[0].length === 0) {
        this.noResults = true;
        this.resultatStatusText = 'Sökningen gav inga resultat';
      } else {
        this.noResults = false;
        this.antalArenden = Object.keys(data)[0];
        this.arendeLista = Object.values(data)[0];
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
