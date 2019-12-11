import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SokFilter } from 'src/app/model/sokFilter';
import { Arende } from 'src/app/model/arende';

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

  constructor(private apiService: ApiService, private element: ElementRef) {
    this.windowRef = window;
    this.sokFilter = new SokFilter('', '', [], [], '', '', '');
  }

  ngOnInit() {
    this.windowRef.komponentbibliotek.initMultiselect();
    if (sessionStorage.getItem('arenden') !== null) {
      this.arendeLista = JSON.parse(sessionStorage.getItem('arenden'));
      this.antalArenden = sessionStorage.getItem('antalarenden');
      this.antalHamtadeArenden = this.arendeLista.length.toString();
      this.noResults = false;
    }
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

  hamtaSokResultat() {
    this.showSpinner = true;
    this.spinnerText = 'Ärenden hämtas';
    sessionStorage.clear();
    this.apiService.getChainedDataArenden(this.sokFilter).subscribe(
      res => {
        this.arendeLista = [];
        if (res[0].length === 0) {
          this.noResults = true;
          this.resultatStatusText = 'Sökningen gav inga resultat';
        } else {
          this.noResults = false;
          this.arendeLista = res[0];
          this.antalHamtadeArenden = this.arendeLista.length.toString();
          this.antalArenden = res[1];
          sessionStorage.setItem('arenden', JSON.stringify(this.arendeLista));
          sessionStorage.setItem('antalarenden', this.antalArenden);
        }
        this.showSpinner = false;
      });
  }

  confirmbtnClick() {
    this.hamtaSokResultat();
  }

  hideSpinner() {
    this.showSpinner = false;
  }

  rensaSokFilter() {

    this.sokFilter.stodAr = '';
    this.sokFilter.kundNummerAlfaNumerisk = '';
    this.sokFilter.arendeTypList = [];
    this.sokFilter.ansokansTypList = [];

    let multiSelects = this.element.nativeElement.querySelectorAll('.tagsContainer');
    for (let i = 0; i < multiSelects.length; i++) {
      while (multiSelects[i].firstChild) {
        multiSelects[i].removeChild(multiSelects[i].firstChild);
      }
    }

    let checkBoxes = this.element.nativeElement.querySelectorAll('.c-checkbox__input');
    for (let i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].checked = false;
    }

  }

}
