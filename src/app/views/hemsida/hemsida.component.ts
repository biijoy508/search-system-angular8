import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SokFilter } from 'src/app/model/sokFilter';
import { Arende } from 'src/app/model/arende';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

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

  constructor(private apiService: ApiService, private element: ElementRef, private titleService: Title) {
    this.windowRef = window;
    this.sokFilter = new SokFilter('', '', [], [], '', '', '');
  }

  ngOnInit() {
    if (sessionStorage.getItem('arenden') !== null) {
      this.arendeLista = JSON.parse(sessionStorage.getItem('arenden'));
      this.antalArenden = this.arendeLista.length.toString();
      this.noResults = false;
    }

    if (sessionStorage.getItem('stodAr') !== null) {
      this.sokFilter.stodAr = JSON.parse(sessionStorage.getItem('stodAr'));
    }

    if (sessionStorage.getItem('kundNummer') !== null) {
      this.sokFilter.kundNummerAlfaNumerisk = JSON.parse(sessionStorage.getItem('kundNummer'));
    }
  }

  ngAfterViewInit() {
    this.titleService.setTitle('Farmen - Sök ärende');
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
    },
      error => console.log('error' + error),
      () => {
        const arendeTypSelect = document.querySelector('#arendeTyp') as HTMLElement;
        const arendeTypOptions = arendeTypSelect.getElementsByTagName('option');
        const ansokansTypSelect = document.querySelector('#ansokansTyp') as HTMLElement;
        const ansokansTypOptions = ansokansTypSelect.getElementsByTagName('option');

        setTimeout(() => {
          this.fyllaAnsokanstypFilterFranSession(ansokansTypOptions);
          this.fyllaArendetypFilterFranSession(arendeTypOptions);
          this.windowRef.komponentbibliotek.initMultiselect();
        }, 20);
      }
    );
  }
  private fyllaArendetypFilterFranSession(arendeTypOptions: HTMLCollectionOf<HTMLOptionElement>) {
    this.sokFilter.arendeTypList = [];
    if (sessionStorage.getItem('arendeTyp') !== null) {
      const sessionArendeTypList = JSON.parse(sessionStorage.getItem('arendeTyp'));
      for (let index = 0; index < sessionArendeTypList.length; index++) {
        for (let i = 0; i < arendeTypOptions.length; i++) {
          if (arendeTypOptions[i].value === sessionArendeTypList[index]) {
            const selectedOption = arendeTypOptions[i] as HTMLOptionElement;
            selectedOption.selected = true;
            selectedOption.setAttribute('selected', 'selected');
            this.sokFilter.arendeTypList.push(selectedOption.text);
          }
        }
      }
    }
  }

  private fyllaAnsokanstypFilterFranSession(ansokansTypOptions: HTMLCollectionOf<HTMLOptionElement>) {
    this.sokFilter.ansokansTypList = [];
    if (sessionStorage.getItem('ansokansTyp') !== null) {
      const sessionAnsokansTypList = JSON.parse(sessionStorage.getItem('ansokansTyp'));
      for (let index = 0; index < sessionAnsokansTypList.length; index++) {
        for (let i = 0; i < ansokansTypOptions.length; i++) {
          if (ansokansTypOptions[i].value === sessionAnsokansTypList[index]) {
            const selectedOption = ansokansTypOptions[i] as HTMLOptionElement;
            selectedOption.selected = true;
            selectedOption.setAttribute('selected', 'selected');
            this.sokFilter.ansokansTypList.push(selectedOption.text);
          }
        }
      }
    }
  }

  onOptionsSelected(sokFilterparameter: string, value: any[]) {
    if (sokFilterparameter === 'arendeTypList') {
      this.sokFilter.arendeTypList.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.sokFilter.arendeTypList.push((value[i] as HTMLOptionElement).text);
      }
    } else if (sokFilterparameter === 'ansokansTypList') {
      this.sokFilter.ansokansTypList.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.sokFilter.ansokansTypList.push((value[i] as HTMLOptionElement).text);
      }
    }
  }

  hamtaSokResultat() {
    if (this.sokFilter.kundNummerAlfaNumerisk === '' && this.sokFilter.arendeTypList.length === 0
      && this.sokFilter.ansokansTypList.length === 0) {
      this.showWarning = true;
    } else {
      this.showSpinner = true;
      this.spinnerText = 'Ärenden hämtas';
      this.alive = true;
      sessionStorage.clear();
      sessionStorage.setItem('stodAr', JSON.stringify(this.sokFilter.stodAr));
      sessionStorage.setItem('kundNummer', JSON.stringify(this.sokFilter.kundNummerAlfaNumerisk));
      sessionStorage.setItem('arendeTyp', JSON.stringify(this.sokFilter.arendeTypList));
      sessionStorage.setItem('ansokansTyp', JSON.stringify(this.sokFilter.ansokansTypList));
      this.hamtaSokResultAnrop = this.apiService.postData(environment.arendenUrl, this.sokFilter).pipe(takeWhile(() => this.alive))
        .subscribe(
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
    sessionStorage.removeItem('stodAr');
    sessionStorage.removeItem('kundNummer');
    sessionStorage.removeItem('arendeTyp');
    sessionStorage.removeItem('ansokansTyp');
    const arendetypdeselectBtn = document.querySelector('#arendeTyp_deselectAll') as HTMLElement;
    arendetypdeselectBtn.dispatchEvent(new Event('click'));
    const ansokantypdeselectBtn = document.querySelector('#ansokansTyp_deselectAll') as HTMLElement;
    ansokantypdeselectBtn.dispatchEvent(new Event('click'));
  }

}
