import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SokFilter } from 'src/app/model/sokFilter';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

interface UrvalValues {
  myndighet: string[];
  stodAr: string[];
  arendeTypList: string[];
  ansokansTypList: string[];
  franStatus: string[];
  tillStatus: string[];
}

@Component({
  selector: 'app-mass-hantering',
  templateUrl: './mass-hantering.component.html',
  styleUrls: ['./mass-hantering.component.scss']
})

export class MassHanteringComponent implements OnInit, AfterViewInit {
  antalPaverkadeArenden = '0';
  showSpinner = true;
  spinnerText = 'Sidan laddas';
  showWarning = false;
  successStatus = false;
  windowRef: any;
  sokFilter: SokFilter;

  urvalValuesHolder: UrvalValues = {
    myndighet: [''],
    stodAr: [''],
    arendeTypList: [],
    ansokansTypList: [''],
    franStatus: [''],
    tillStatus: ['']
  };

  constructor(private apiService: ApiService, private titleService: Title) {
    this.windowRef = window;
    this.sokFilter = new SokFilter('', '', [], [], '', '', '');
  }

  ngOnInit() {
    this.hamtaUrvalValues();
  }

  ngAfterViewInit() {
    this.titleService.setTitle('Farmen - Masshantering');
    this.windowRef.komponentbibliotek.init();
  }

  onStangVarning() {
    this.showWarning = false;
  }

  onAndraStatus() {
    this.showWarning = false;
    this.apiService.postData(environment.masshanteringUrl, this.sokFilter).subscribe(
      (data: string) => {
        this.successStatus = true;
      }
    );
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
        this.urvalValuesHolder.arendeTypList = [];
        for (let i = 0; i < res[2].length; i++) {
          this.urvalValuesHolder.arendeTypList.push(res[2][i].kod);
        }
        this.urvalValuesHolder.ansokansTypList = [''];
        for (let i = 0; i < res[3].length; i++) {
          this.urvalValuesHolder.ansokansTypList.push(res[3][i]);
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

  visaBekraftelse() {
    this.hamtaAntalPaverkadeArenden();
  }

  hamtaAntalPaverkadeArenden() {
    this.apiService.postData(environment.paverkadeArendenUrl, this.sokFilter).subscribe(
      (data: string) => {
        this.antalPaverkadeArenden = data;
        this.showWarning = true;
        this.successStatus = false;
      }
    );
  }

  togglesuccessBanner() {
    this.successStatus = !this.successStatus;
  }

  onOptionsSelected(sokFilterparameter: string, value: any[]) {
    if (sokFilterparameter === 'arendeTypList') {
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

}
