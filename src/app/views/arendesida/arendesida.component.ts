import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AnsokanDjurvalfard } from 'src/app/model/ansokanDjurvalfard';
import { Arende } from 'src/app/model/arende';
import { ArendeVersion } from 'src/app/model/arendeVersion';
import { Atgard } from 'src/app/model/atgard';
import { AtgardTypModel } from 'src/app/model/atgardTypModel';
import { Attribut } from 'src/app/model/attribut';
import { Berakning } from 'src/app/model/berakning';
import { Beslut } from 'src/app/model/beslut';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { avbrytLaggTillAtgard, deselectLaggtillAtgardSelectElement, hanteraLaggTillAtgardBekraftaKnappStatus } from './arendesidaFunktioner/arendesidaSkapaManuelAtgard';
import { showToaster, kontrolleraFlikar } from './arendesidaFunktioner/arendesidaUtility';
import { redigeraAnsDjurValView } from './arendesidaFunktioner/arendesidaAnsokanDjurvalfard';


@Component({
  selector: 'app-arendesida',
  templateUrl: './arendesida.component.html',
  styleUrls: ['./arendesida.component.scss']
})
export class ArendesidaComponent implements AfterViewInit {
  windowRef: any;
  arende: Arende;
  arendeId: any;
  kundNummer: any;
  atgardLista: Atgard[] = [];
  manuellAtgardTypLista: AtgardTypModel[] = [];
  valdAtgardTyp: AtgardTypModel;
  arendeVersionLista: ArendeVersion[] = [];
  ansokanDjurvalfard: AnsokanDjurvalfard;
  attributLista: Attribut[] = [];
  valdArendeversion: ArendeVersion;
  beslut: Beslut;
  beslutSummaFinns: boolean;
  beslutFinns: boolean;
  attributFinns: boolean;
  ingaAtgarder: boolean;
  redigeraLageAtgarder: boolean;

  PPNnummer = '43,42';

  filtreringsAlternativ = 'alla';

  tidigareVersion = false;
  valdFlik = 'ansokanDjurvalfard';
  errorMessage = '';
  showSpinner = true;
  spinnerText = 'Sidan laddas';

  valdAtgard: Atgard;
  showWarning = false;
  alive = true;

  atgardSelectElement: HTMLSelectElement;
  skapaManuellAtgardBlock: HTMLDivElement;
  laggTillAtgardBekraftaKnapp: HTMLButtonElement;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.windowRef = window;
    this.arende = new Arende('', '', '', '', '', '', '', '', '', '');
    this.ansokanDjurvalfard = new AnsokanDjurvalfard([], '', '');
    let berakning = new Berakning('', '', '');
    this.beslut = new Beslut('', '', '', '', '', '', berakning, [], []);
    this.valdAtgardTyp = new AtgardTypModel('', '', '', [], '', '');
    this.valdAtgard = new Atgard(this.valdAtgardTyp, '', '', '', '', '', '', '', '', '', '', '');
  }

  ngAfterViewInit() {
    this.arendeId = this.route.snapshot.paramMap.get('arendeId');
    this.kundNummer = this.route.snapshot.paramMap.get('kundNummer');
    this.atgardSelectElement = document.querySelector('#manuellAtgardTyp') as HTMLSelectElement;
    this.skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
    this.laggTillAtgardBekraftaKnapp = document.querySelector('#bekraftaLaggTillAtgard') as HTMLButtonElement;

    const arendeParam = {
      arendeid: this.arendeId,
      kundnummer: this.kundNummer
    };

    hanteraLaggTillAtgardBekraftaKnappStatus(this.atgardSelectElement, this.laggTillAtgardBekraftaKnapp);

    this.titleService.setTitle('Farmen - ' + this.kundNummer);

    this.hamtaArendeInformation(arendeParam);
  }

    hamtaArendeInformation(arendeParam: { arendeid: any; kundnummer: any; }) {
    this.apiService.getChainedDataArendeInformation(arendeParam).pipe(takeWhile(() => this.alive)).subscribe((data: any) => {
      this.atgardLista = [];
      this.arendeVersionLista = [];
      this.arende = data[0];
      this.arendeVersionLista = data[1];
      this.atgardLista = data[2];
      if (this.atgardLista.length === 0) {
        this.ingaAtgarder = true;
      } else {
        this.ingaAtgarder = false;
      }
      this.errorMessage = '';
      this.valdArendeversion = this.arendeVersionLista.find(entity => entity.gallande === 'J');
    }, (err: any) => {
      console.log(err.message);
      this.errorMessage = err.message;
      this.showSpinner = false;
    }, () => {
      this.windowRef.komponentbibliotek.init();
        kontrolleraFlikar(this.arende);
        setTimeout(() => {
          this.showSpinner = false;
        }, 2000);
    });
  }

  ngOnDestroy() {
    this.hideSpinner();
  }

  hideSpinner() {
    this.alive = false;
    this.showSpinner = false;
  }
  redigeraView(button: HTMLButtonElement) {
    redigeraAnsDjurValView(button);
  }
  filtreraAtgarder(filtreringsAlternativ) {
    this.filtreringsAlternativ = filtreringsAlternativ;
    const atgardListaForm = document.querySelector('#atgardLista');
    const atgarderUILista = atgardListaForm.querySelectorAll('.c-accordion-group');
    if (filtreringsAlternativ === 'öppna') {
      for (let i = 0; i < atgarderUILista.length; i++) {
        let atgard = atgarderUILista[i] as HTMLElement;
        if (atgard.id === 'ÖPP') {
          atgard.style.display = 'block';
        } else {
          atgard.style.display = 'none';
        }
      }
    } else if (filtreringsAlternativ === 'stängda') {
      for (let i = 0; i < atgarderUILista.length; i++) {
        let atgard = atgarderUILista[i] as HTMLElement;
        if (atgard.id === 'ÖPP') {
          atgard.style.display = 'none';
        } else {
          atgard.style.display = 'block';
        }
      }
    } else {
      for (let i = 0; i < atgarderUILista.length; i++) {
        let atgard = atgarderUILista[i] as HTMLElement;
        atgard.style.display = 'block';
      }
    }
  }

  redigeraAtgard(atgard, event) {
    if (atgard.statusKod === 'ÖPP' || (atgard.kommentar != null && atgard.kommentar !== '')) {
      const sparaKnapp = event.target as HTMLButtonElement;
      sparaKnapp.disabled = true;
      this.apiService.postData(environment.redigeraAtgardUrl, atgard).subscribe(
        (data: Atgard) => {
          const atgardIndex = this.atgardLista.findIndex(item => item.id === data.id);
          this.atgardLista[atgardIndex] = data;
          this.redigeraLageAtgarder = false;
          sparaKnapp.disabled = false;
          this.errorMessage = '';
        },
        (err: any) => {
          this.errorMessage = err.error.svar;
          sparaKnapp.disabled = false;
        },
        () => {
          setTimeout(() => {
            this.windowRef.komponentbibliotek.init();
          }, 2000);
        }
      );
    } else {
      this.showWarning = true;
    }
  }
  hamtaManuellaAtgardTyper() {
    this.valdAtgardTyp = new AtgardTypModel('', '', '', [], '', '');
    const arendeParam = {
      stodar: this.arende.stodAr,
      arendeid: this.arende.arendeId
    };

    this.apiService.getDataMedParametrar(environment.atgardTyperUrl, arendeParam).subscribe(
      (data: any) => {
        this.errorMessage = '';
        this.manuellAtgardTypLista = data;
        this.manuellAtgardTypLista.unshift(this.valdAtgardTyp);
        this.skapaManuellAtgardBlock.style.display = 'block';
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
      });
  }

  skapaManuellAtgard(event) {
    this.apiService.postData(environment.skapaManuellAtgardUrl, this.valdAtgardTyp)
      .subscribe(
        (data: Atgard) => {
          this.ingaAtgarder = false;
          this.atgardSelectElement.selectedIndex = -1;
          this.atgardLista.push(data);
          this.errorMessage = '';
          showToaster('Åtgärden har lagts till.');
        },
        (err: any) => {
          if (err.error.svar.includes('Åtgärden finns')) {
            showToaster(err.error.svar);
          } else {
            this.errorMessage = err.error.svar;
          }
        },
        () => {
          deselectLaggtillAtgardSelectElement(this.atgardSelectElement);
          setTimeout(() => {
            this.windowRef.komponentbibliotek.init();
          }, 100);
        }
      );
  }

  toggleRedigeraLageAtgard(event, index) {
    this.valdAtgard = this.atgardLista[index];
    if (event.target.innerText === 'Redigera') {
      this.redigeraLageAtgarder = true;
    } else if (event.target.innerText === 'Avbryt') {
      this.redigeraLageAtgarder = false;
    }
  }
  hamtaDataForValdFlik() {
    if (this.valdFlik === 'ansokanDjurvalfard') {
      this.hamtaAnsokanDjurvalfard();
    } else if (this.valdFlik === 'attribut') {
      this.hamtaAttribut();
    } else if (this.valdFlik === 'beslut') {
      this.hamtaBeslut();
    }
  }

  hamtaAnsokanDjurvalfard() {
    this.apiService.getData(`${environment.ansokanDjurvalfardUrl}/${this.valdArendeversion.arendeversionId}`).subscribe(
      (data: any) => {
        this.ansokanDjurvalfard = data;
        this.errorMessage = '';
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
      });
  }

  hamtaAttribut() {
    const arendeParam = {
      arendeid: this.valdArendeversion.arendeId,
      arendeversionid: this.valdArendeversion.arendeversionId,
      arendetyp: this.arende.arendeTyp
    };

    this.apiService.getDataMedParametrar(environment.attributUrl, arendeParam).subscribe(
      (data: any) => {
        this.attributLista = data;
        if (this.attributLista.length === 0) {
          this.attributFinns = false;
        } else {
          this.attributFinns = true;
        }
        this.errorMessage = '';
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
      });
  }
  hamtaBeslut() {
    const arendeParam = {
      arendeid: this.valdArendeversion.arendeId,
      arendeversionid: this.valdArendeversion.arendeversionId
    };

    this.apiService.getDataMedParametrar(environment.beslutInfoUrl, arendeParam).subscribe(
      (data: any) => {
        this.beslut = data;
        this.errorMessage = '';
        setTimeout(() => {
          if (this.beslut) {
            this.beslutFinns = true;
            if (this.beslut.berakningUtbAterkrav !== null && this.beslut.berakningUtbAterkrav !== undefined) {
              this.beslutSummaFinns = true;
            } else {
              this.beslutSummaFinns = false;
            }
          } else {
            this.beslutFinns = false;
          }
        }, 100);

        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 150);
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
      });
  }
  visaTidigareVersion(select: HTMLSelectElement) {

    this.valdArendeversion = this.arendeVersionLista.find(entity => entity.arendeversionId === select.value);

    if (this.valdArendeversion.gallande === 'J') {
      this.tidigareVersion = false;
    } else {
      this.tidigareVersion = true;
    }

    this.hamtaDataForValdFlik();
  }

  sattValdFlik(valdFlik) {
    this.valdFlik = valdFlik;
    this.hamtaDataForValdFlik();
  }

  togglewarning() {
    this.showWarning = false;
  }
  avbrytLaggTillAtgard() {
    avbrytLaggTillAtgard(this.skapaManuellAtgardBlock, this.atgardSelectElement);
  }
}

