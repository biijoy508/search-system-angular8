// tslint:disable: prefer-for-of
import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AnsokanDjurvalfard } from 'src/app/model/ansokanDjurvalfard';
import { Arende } from 'src/app/model/arende';
import { ArendeVersion } from 'src/app/model/arendeVersion';
import { Atgard } from 'src/app/model/atgard';
import { AtgardTypModel } from 'src/app/model/atgardTypModel';
import { AnsokanDVFArendeversion } from 'src/app/model/ansokanDVFArendeversion';
import { Attribut } from 'src/app/model/attribut';
import { Berakning } from 'src/app/model/berakning';
import { Beslut } from 'src/app/model/beslut';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
// tslint:disable-next-line: max-line-length
import { avbrytLaggTillAtgard, deselectLaggtillAtgardSelectElement, hanteraLaggTillAtgardBekraftaKnappStatus } from './arendesidaFunktioner/arendesidaSkapaManuelAtgard';
import { showToaster, kontrolleraFlikar } from './arendesidaFunktioner/arendesidaUtility';
import { AnsokanPPN } from 'src/app/model/ansokanPPN';

interface OandradeAtgard {
  atgardId: string;
  atgard: Atgard;
}

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
  oandradeAtgardLista: OandradeAtgard[] = [];
  manuellAtgardTypLista: AtgardTypModel[] = [];
  valdAtgardTyp: AtgardTypModel;
  arendeVersionLista: ArendeVersion[] = [];
  ansokanDjurvalfard: AnsokanDjurvalfard;
  oandradeAnsokanDjurvalfard: AnsokanDjurvalfard;
  ansokanDVFArendeversion: AnsokanDVFArendeversion;
  ansokanPPN: AnsokanPPN;

  attributLista: Attribut[] = [];
  valdArendeversion: ArendeVersion;
  beslut: Beslut;
  beslutSummaFinns: boolean;
  beslutFinns: boolean;
  attributFinns: boolean;
  ingaAtgarder: boolean;
  redigeraLageAtgarder = false;
  redigeraLageAnsDjur = false;
  PPNnummer: string[];

  filtreringsAlternativ = 'alla';

  tidigareVersion = false;
  valdFlik = 'ansokanDjurvalfard';
  errorMessage = '';
  showSpinner = true;
  spinnerText = 'Sidan laddas';
  valdAtgardId = '';
  warningMessage = '';
  alive = true;

  atgardSelectElement: HTMLSelectElement;
  skapaManuellAtgardBlock: HTMLDivElement;
  laggTillAtgardBekraftaKnapp: HTMLButtonElement;
  redigerbarAnsokanDjurvalfardElements: NodeListOf<HTMLElement>;
  oredigerbarAnsokanDjurvalfardElements: NodeListOf<HTMLElement>;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.windowRef = window;
    this.arende = new Arende('', '', '', '', '', '', '', '', '', '');
    this.ansokanDjurvalfard = new AnsokanDjurvalfard([], '', '');
    const berakning = new Berakning('', '', '');
    this.beslut = new Beslut('', '', '', '', '', '', berakning, [], []);
    this.valdAtgardTyp = new AtgardTypModel('', '', '', [], '', '');
    this.ansokanDVFArendeversion = new AnsokanDVFArendeversion('', '', '');
    this.ansokanPPN = new AnsokanPPN('',[]);
  }

  ngAfterViewInit() {
    this.arendeId = this.route.snapshot.paramMap.get('arendeId');
    this.kundNummer = this.route.snapshot.paramMap.get('kundNummer');
    this.atgardSelectElement = document.querySelector('#manuellAtgardTyp') as HTMLSelectElement;
    this.skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
    this.laggTillAtgardBekraftaKnapp = document.querySelector('#bekraftaLaggTillAtgard') as HTMLButtonElement;
    this.redigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.redigerbarAnsDjurElement');
    this.oredigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.oredigerbarAnsDjurElement');
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

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.hideSpinner();
  }

  hideSpinner() {
    this.alive = false;
    this.showSpinner = false;
  }

  redigeraAnsDjurValView(button: HTMLButtonElement, ansokanDjurvalfard: AnsokanDjurvalfard) {

      this.oandradeAnsokanDjurvalfard = cloneDeep(ansokanDjurvalfard);
      this.redigeraLageAnsDjur = true;

      for (let i = 0; i < this.redigerbarAnsokanDjurvalfardElements.length; i++) {
      (this.redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'block';
    }
      for (let j = 0; j < this.oredigerbarAnsokanDjurvalfardElements.length; j++) {
      (this.oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'none';
    }
  }

  avbrytAnsDjurValView(button: HTMLButtonElement, ansokanDjurvalfard: AnsokanDjurvalfard) {
    const ppnNumberRedigeringsUI = (document.querySelector('.tagValuesHolder') as HTMLInputElement);
    ppnNumberRedigeringsUI.value = this.ansokanDjurvalfard.ppnLista.toString();
    this.windowRef.komponentbibliotek.initTagsInput();
    this.redigeraLageAnsDjur = false;
    this.ansokanDjurvalfard = cloneDeep(this.oandradeAnsokanDjurvalfard);
    for (let i = 0; i < this.redigerbarAnsokanDjurvalfardElements.length; i++) {
      (this.redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'none';
    }
    for (let j = 0; j < this.oredigerbarAnsokanDjurvalfardElements.length; j++) {
      (this.oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'block';
    }
  }

  sparaAnsDjurValView(button: HTMLButtonElement, ansokanDjurvalfard: AnsokanDjurvalfard) {
    const ppnNumberRedigeringsUI = (document.querySelector('.tagValuesHolder') as HTMLInputElement);
    this.ansokanDjurvalfard.ppnLista = ppnNumberRedigeringsUI.value.split(',');
    this.redigeraLageAnsDjur = false;
    this.sparaAnokanDjurvalfard();

    for (let i = 0; i < this.redigerbarAnsokanDjurvalfardElements.length; i++) {
      (this.redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'none';
    }
    for (let j = 0; j < this.oredigerbarAnsokanDjurvalfardElements.length; j++) {
      (this.oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'block';
    }
  }

  sparaAnokanDjurvalfard() {

    this.ansokanDVFArendeversion.antalDjur = this.ansokanDjurvalfard.antalDjur;
    this.ansokanDVFArendeversion.arendeTyp = this.arende.arendeTyp;
    this.ansokanDVFArendeversion.arendeversionId = this.valdArendeversion.arendeversionId;
    this.ansokanPPN.arendeversionId = this.valdArendeversion.arendeversionId;
    this.ansokanPPN.ppnLista = this.ansokanDjurvalfard.ppnLista;

    this.apiService.postData(environment.redigeraAntalDjurUrl, this.ansokanDVFArendeversion).subscribe(
      (data: string) => {

      },
      (error: any) => {
        console.log(error.message.svar);
      },
      () => {

      }
    );


    this.apiService.postData(environment.redigeraPPNUrl, this.ansokanPPN).subscribe(
      (data: string) => {

      },
      (error: any) => {
        console.log(error.message.svar);
      },
      () => {

        console.log(this.ansokanDjurvalfard.ppnLista);

      }

    );

    this.hamtaAnsokanDjurvalfard();

  }

  filtreraAtgarder(filtreringsAlternativ) {
    this.filtreringsAlternativ = filtreringsAlternativ;
    const atgardListaForm = document.querySelector('#atgardLista');
    const atgarderUILista = atgardListaForm.querySelectorAll('.c-accordion-group');
    if (filtreringsAlternativ === 'öppna') {
      for (let i = 0; i < atgarderUILista.length; i++) {
        const atgard = atgarderUILista[i] as HTMLElement;
        if (atgard.id === 'ÖPP') {
          atgard.style.display = 'block';
        } else {
          atgard.style.display = 'none';
        }
      }
    } else if (filtreringsAlternativ === 'stängda') {
      for (let i = 0; i < atgarderUILista.length; i++) {
        const atgard = atgarderUILista[i] as HTMLElement;
        if (atgard.id === 'ÖPP') {
          atgard.style.display = 'none';
        } else {
          atgard.style.display = 'block';
        }
      }
    } else {
      for (let i = 0; i < atgarderUILista.length; i++) {
        const atgard = atgarderUILista[i] as HTMLElement;
        atgard.style.display = 'block';
      }
    }
  }
  hanteraRedigeraAtgard(atgard: Atgard, index) {
    this.valdAtgardId = atgard.id;
    if (this.redigeraLageAtgarder === false) {
      this.redigeraLageAtgarder = true;
      this.oandradeAtgardLista.push(
        {
          atgardId: atgard.id,
          atgard: cloneDeep(atgard)
        });
    } else {
      showToaster('Osparade åtgard finns!! ');
    }
  }
  hanteraAvbrytAtgard(atgard: Atgard, index) {
    this.redigeraLageAtgarder = false;
    const gammalValueIndex = this.oandradeAtgardLista.findIndex(obj => obj.atgardId === atgard.id);
    this.atgardLista[index] = cloneDeep(this.oandradeAtgardLista[gammalValueIndex].atgard);
    this.oandradeAtgardLista.splice(gammalValueIndex, 1);
    setTimeout(() => {
      const accordion = document.getElementById(atgard.id + '-accordion') as HTMLElement;
      accordion.classList.add('open');
      this.windowRef.komponentbibliotek.initAccordion();
    }, 100);
  }
  sparaRedigeratAtgard(atgard, event) {
    if (atgard.statusKod === 'ÖPP' || (atgard.kommentar != null && atgard.kommentar !== '')) {
      this.redigeraLageAtgarder = false;
      const gammalValueIndex = this.oandradeAtgardLista.findIndex(obj => obj.atgardId === atgard.id);
      this.oandradeAtgardLista.splice(gammalValueIndex, 1);
      const sparaKnapp = event.target as HTMLButtonElement;
      sparaKnapp.disabled = true;
      this.apiService.postData(environment.redigeraAtgardUrl, atgard).subscribe(
        (data: Atgard) => {
          const atgardIndex = this.atgardLista.findIndex(item => item.id === data.id);
          this.atgardLista[atgardIndex] = data;
          sparaKnapp.disabled = false;
          this.errorMessage = '';
        },
        (err: any) => {
          this.errorMessage = err.error.svar;
          sparaKnapp.disabled = false;
        },
        () => {
          setTimeout(() => {
            const accordion = document.getElementById(atgard.id + '-accordion') as HTMLElement;
            accordion.classList.add('open');
            this.windowRef.komponentbibliotek.initAccordion();
          }, 500);
        }
      );
    } else {
      this.warningMessage = 'Kommentar måste anges.';
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
        this.PPNnummer = this.ansokanDjurvalfard.ppnLista;
        //console.log(this.PPNnummer);
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
    this.warningMessage = '';
  }
  avbrytLaggTillAtgard() {
    avbrytLaggTillAtgard(this.skapaManuellAtgardBlock, this.atgardSelectElement);
  }
}

