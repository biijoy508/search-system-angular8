import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SokFilter } from 'src/app/model/sokFilter';
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
  arendeTypList: string[];
  ansokansTypList: string[];
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
  sokFilter: SokFilter;

  sokFaltValuesHolder: SokFaltValues = {
    stodAr: [],
    arendeTypList: [],
    ansokansTypList: []
  };

  constructor(private apiService: ApiService) {
    this.windowRef = window;
    this.sokFilter = new SokFilter('', '', [''], [''], '', '', '');
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
        this.sokFaltValuesHolder.arendeTypList = [];
        for (let i = 0; i < res[1].length; i++) {
          this.sokFaltValuesHolder.arendeTypList.push(res[1][i].kod);
        }
        this.sokFaltValuesHolder.ansokansTypList = [];
        for (let i = 0; i < res[2].length; i++) {
          this.sokFaltValuesHolder.ansokansTypList.push(res[2][i].kod);
        }
        console.log('Sök fält initierat');
        this.showSpinner = false;
      });
  }

  hamtaSokResultatFranArendeModule() {
    this.apiService.hamtaSokData(environment.arendenUrl, this.sokFilter).subscribe(
      (data: Arende[]) => {
        this.arendeLista = [];
        if (data.length === 0) {
          this.noResults = true;
          this.resultatStatusText = 'Sökningen gav inga resultat';
        } else {
          this.noResults = false;
          this.arendeLista = data;
          this.antalHamtadeArenden = this.arendeLista.length.toString();
        }
        this.showSpinner = false;
      }
    );
  }

 /*  hamtaTotaltAntalArenden() {
    this.apiService.hamtaSokData(environment.antalArendenUrl, this.sokFilter).subscribe(
      (data: string) => {
        this.antalArenden = data;
      }
    )
  } */

  onOptionsSelected(sokFilterparameter: string, value: any[]) {
    if (sokFilterparameter === "arendeTypList") {
      this.sokFilter.arendeTypList.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.sokFilter.arendeTypList.push((value[i] as HTMLOptionElement).text);
      }
    } else if (sokFilterparameter === "ansokansTypList") {
      this.sokFilter.ansokansTypList.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.sokFilter.ansokansTypList.push((value[i] as HTMLOptionElement).text);
      }
    }
  }

  confirmbtnClick() {
    this.showSpinner = true;
    this.spinnerText = 'Ärenden hämtas';
    return new Promise(() => {
      this.hamtaSokResultatFranArendeModule();
      // this.hamtaTotaltAntalArenden();
    })
  }

}
