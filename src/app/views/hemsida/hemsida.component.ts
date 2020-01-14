import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SokFilter } from 'src/app/model/sokFilter';
import { Arende } from 'src/app/model/arende';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

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
  arendeLista: Arende[] = [];
  noResults = true;
  windowRef: any;
  showSpinner = true;
  resultatStatusText = 'Välj sökfilter och klicka på sök för att visa resultat';
  spinnerText = 'Sidan laddas';
  showWarning = false;

  alive = true;
  sokFilter: SokFilter;
  hamtaSokResultAnrop: Subscription;

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
      this.antalArenden = this.arendeLista.length.toString();
      this.noResults = false;
    }
    if (sessionStorage.getItem('stodAr') !== null) {
      this.sokFilter.stodAr = JSON.parse(sessionStorage.getItem('stodAr'));
      console.log(this.sokFilter.stodAr);
    }

    if (sessionStorage.getItem('kundNummer') !== null) {
      this.sokFilter.kundNummerAlfaNumerisk = JSON.parse(sessionStorage.getItem('kundNummer'));
    }

    if (sessionStorage.getItem('arendeTyp') !== null) {
       let arendeTypList = JSON.parse(sessionStorage.getItem('arendeTyp'));
       console.log(arendeTypList);
      for (let i = 0; i < arendeTypList.length; i++) {
        
        let newOption = document.createElement("option");
        newOption.value = arendeTypList[i];
        newOption.selected = true;
        newOption.innerHTML = arendeTypList[i];
        console.log(newOption);
        this.sokFilter.arendeTypList.push((newOption as HTMLOptionElement).text);

      }
    }

    if (sessionStorage.getItem('ansokansTyp') !== null) {
      this.sokFilter.ansokansTypList = JSON.parse(sessionStorage.getItem('ansokansTyp'));
    }
  }

  ngAfterViewInit() {
    this.hamtaSokFaltValues();
  }

  ngOnDestroy() {
    this.hideSpinner();
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
          this.sokFaltValuesHolder.ansokansTypList.push(res[2][i]);
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
        console.log(value[i]);
      }
    } else if (sokFilterparameter === "ansokansTypList") {
      this.sokFilter.ansokansTypList.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.sokFilter.ansokansTypList.push((value[i] as HTMLOptionElement).text);
      }
    }
  }

  hamtaSokResultat() {
    if (this.sokFilter.kundNummerAlfaNumerisk === '' && this.sokFilter.arendeTypList.length === 0 && this.sokFilter.ansokansTypList.length === 0) {
      this.showWarning = true;
    } else {
      this.showSpinner = true;
      this.spinnerText = 'Ärenden hämtas';
      this.alive = true;
      sessionStorage.clear();
      this.hamtaSokResultAnrop = this.apiService.postData(environment.arendenUrl, this.sokFilter).pipe(takeWhile(() => this.alive)).subscribe(
        res => {
          this.arendeLista = [];
          if (res.length === 0) {
            this.noResults = true;
            this.resultatStatusText = 'Sökningen gav inga resultat';
          } else {
            this.noResults = false;
            this.arendeLista = res;
            this.antalArenden = this.arendeLista.length.toString();
            sessionStorage.setItem('arenden', JSON.stringify(this.arendeLista));
          }
          sessionStorage.setItem('stodAr', JSON.stringify(this.sokFilter.stodAr));
          sessionStorage.setItem('kundNummer', JSON.stringify(this.sokFilter.kundNummerAlfaNumerisk));
          sessionStorage.setItem('arendeTyp', JSON.stringify(this.sokFilter.arendeTypList));
          sessionStorage.setItem('ansokansTyp', JSON.stringify(this.sokFilter.ansokansTypList));
          this.showSpinner = false;
        });
    }
  }

  confirmbtnClick() {
    this.hamtaSokResultat();
  }

  hideSpinner() {
    this.alive = false;
    this.showSpinner = false;
  }

  togglewarning() {
    this.showWarning = false;
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
