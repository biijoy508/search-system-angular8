import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';


interface UrvalValues {
  myndighet: string[];
  stodAr: string[];
  arendeTyp: string[];
  ansokansTyp: string[];
  franStatus: string[];
  tillStatus: string[];
}

interface Urval {
  myndighet: string;
  stodAr: string;
  arendeTyp: string[];
  ansokansTyp: string;
  franStatus: string;
  tillStatus: string;
}

@Component({
  selector: 'app-mass-hantering',
  templateUrl: './mass-hantering.component.html',
  styleUrls: ['./mass-hantering.component.scss']
})
export class MassHanteringComponent implements OnInit, AfterViewInit {
  antalPaverkadeArenden = '0';

  showSpinner = true;
  showWarning = false;
  successStatus = false;

  spinnerText = 'Sidan laddas';
  windowRef: any;

  urvalValuesHolder: UrvalValues = {
    myndighet: [''],
    stodAr: [''],
    arendeTyp: [''],
    ansokansTyp: [''],
    franStatus: [''],
    tillStatus: ['']
  };

  urval: Urval = {
    myndighet: '',
    stodAr: '',
    arendeTyp: [''],
    ansokansTyp: '',
    franStatus: '',
    tillStatus: ''
  };

  constructor(private apiService: ApiService) {
    this.windowRef = window;
   }

  ngOnInit() {
    this.hamtaUrvalValues();
  }

  ngAfterViewInit() {
    this.windowRef.komponentbibliotek.init();
  }

  hamtaUrvalValues() {

    this.apiService.getChainedDataMassHantering()
      .subscribe(res => {

        this.urvalValuesHolder.myndighet = [''];
        for (let i = 0; i < res[0].length; i++) {
          this.urvalValuesHolder.myndighet.push(res[0][i].namn);
        }
        this.urvalValuesHolder.stodAr = [''];
        for (let i = 0; i < res[1].length; i++) {
          this.urvalValuesHolder.stodAr.push(res[1][i]);
        }
        this.urvalValuesHolder.arendeTyp = [''];
        for (let i = 0; i < res[2].length; i++) {
          this.urvalValuesHolder.arendeTyp.push(res[2][i].kod);
        }
        this.urvalValuesHolder.ansokansTyp = [''];
        for (let i = 0; i < res[3].length; i++) {
          this.urvalValuesHolder.ansokansTyp.push(res[3][i].kod);
        }
        this.urvalValuesHolder.franStatus = [''];
        for (let i = 0; i < res[4].length; i++) {
          this.urvalValuesHolder.franStatus.push(res[4][i]);
        }
        this.urvalValuesHolder.tillStatus = [''];
        for (let i = 0; i < res[4].length; i++) {
          this.urvalValuesHolder.tillStatus.push(res[4][i]);
        }
        this.showSpinner = false;
      });
  }

  andraStatus() {
    this.hamtaAntalPaverkadeArenden();
  }

  hamtaAntalPaverkadeArenden() {

    const urlParameter = {
      myndighet: this.urval.myndighet,
      stodar: this.urval.stodAr,
      arendetyp: this.urval.arendeTyp,
      ansokanstyp: this.urval.ansokansTyp,
      franstatus: this.urval.franStatus,
      tillstatus: this.urval.tillStatus
    };

    this.apiService.getDataMedParametrar(environment.paverkadeArendenUrl, urlParameter).subscribe((data: string) => {
      this.antalPaverkadeArenden = data;
      this.showWarning = true;
    });

  }

  togglewarningAndSuccessBanner() {
    this.showWarning = false;
    this.successStatus = true;
  }
  togglewarning() {
    this.showWarning = false;
  }

  onOptionsSelected(sokFilterparameter: string, value: any[]) {
    if (sokFilterparameter === 'arendeTyp') {
      this.urval.arendeTyp.length = 0;
      for (let i = 0; i < value.length; i++) {
        this.urval.arendeTyp.push((value[i] as HTMLOptionElement).text);
      }
    }
  }

}
