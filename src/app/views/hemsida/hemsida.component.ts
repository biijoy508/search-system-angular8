import { Component, AfterViewInit, OnInit } from '@angular/core';
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
  arendeTyp: string[];
  ansokansTyp: string[];
}

@Component({
  selector: 'app-hemsida',
  templateUrl: './hemsida.component.html',
  styleUrls: ['./hemsida.component.scss']
})

export class HemsidaComponent implements AfterViewInit, OnInit {
  antalArenden = '0';
  antalHamtadeArenden = '0';
  arendeLista: Arende[] = [];
  noResults = true;
  windowRef: any;
  showSpinner = true;
  resultatStatusText = 'Välj sökfilter och klicka på sök för att visa resultat';
  spinnerText = 'Sidan laddas';

  sokFaltValuesHolder: SokFaltValues = {
    stodAr: [],
    arendeTyp: [],
    ansokansTyp: []
  };

  sokFilter: SokFilter = {
    kundNummer: '',
    stodAr: '',
    arendeTyp: [''],
    ansokansTyp: ['']
  };

  constructor(private apiService: ApiService) {
    this.windowRef = window;
  }

  ngOnInit() {
    this.windowRef.komponentbibliotek.initMultiselect();
  }
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
        this.sokFaltValuesHolder.arendeTyp = [];
        for (let i = 0; i < res[1].length; i++) {
          this.sokFaltValuesHolder.arendeTyp.push(res[1][i].kod);
        }
        this.sokFaltValuesHolder.ansokansTyp = [];
        for (let i = 0; i < res[2].length; i++) {
          this.sokFaltValuesHolder.ansokansTyp.push(res[2][i].kod);
        }
        console.log('Sök fält initierat');
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
      this.arendeLista = [];
      if (Object.values(data)[0].length === 0) {
        this.noResults = true;
        this.resultatStatusText = 'Sökningen gav inga resultat';
      } else {
        this.noResults = false;
        this.antalArenden = Object.keys(data)[0];
        this.arendeLista = Object.values(data)[0];
        this.antalHamtadeArenden = this.arendeLista.length.toString();
      }
      this.showSpinner = false;
    });

  }

  onOptionsSelected(sokFilterparameter: string, value: any[]) {
    if (sokFilterparameter === "arendeTyp") {
      this.sokFilter.arendeTyp.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.sokFilter.arendeTyp.push((value[i] as HTMLOptionElement).text);
      }
    } else if (sokFilterparameter === "ansokansTyp") {
      this.sokFilter.ansokansTyp.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.sokFilter.ansokansTyp.push((value[i] as HTMLOptionElement).text);
      }
    }
  }


  confirmbtnClick() {
    this.showSpinner = true;
    this.spinnerText = 'Ärenden hämtas';
    return new Promise(() => {
      this.hamtaSokResultatFranArendeModule();
    });

  }
}
