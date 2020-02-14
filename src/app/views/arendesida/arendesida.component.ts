// tslint:disable: prefer-for-of
import { AfterViewInit, Component, OnDestroy, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
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
// tslint:disable-next-line: max-line-length
import { avbrytLaggTill, deselectLaggtillSelectElement, hanteraLaggTillBekraftaKnappStatus } from './arendesidaFunktioner/arendesidaSkapa';
import { showToaster, kontrolleraFlikar } from './arendesidaFunktioner/arendesidaUtility';
import { CanDeactivateComponentDeactivate } from 'src/app/services/varinig-ospadedata-data.guard';

interface OandradeAtgard {
  atgardId: string;
  atgard: Atgard;
}

interface OandratAttribut {
  attributId: string;
  attribut: Attribut;
}

@Component({
  selector: 'app-arendesida',
  templateUrl: './arendesida.component.html',
  styleUrls: ['./arendesida.component.scss']
})
export class ArendesidaComponent implements AfterViewInit, OnDestroy, CanDeactivateComponentDeactivate {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.windowRef = window;
    this.arende = new Arende('', '', '', '', '', '', '', '', '', '');
    this.ansokanDjurvalfard = new AnsokanDjurvalfard([], '', '', '', '');
    const berakning = new Berakning('', '', '');
    this.beslut = new Beslut('', '', '', '', '', '', berakning, [], []);
    this.valdAtgardTyp = new AtgardTypModel('', '', '', [], '', '');
    this.valtAttribut = new Attribut('', '', '', '', '', [], '', '', '', '', '');
  }


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

  attributLista: Attribut[] = [];
  giltigtAttributLista: Attribut[] = [];
  oandratAttributLista: OandratAttribut[] = [];
  valtAttribut: Attribut;
  valtAttributId = '';
  valdArendeversion: ArendeVersion;
  beslut: Beslut;
  beslutSummaFinns: boolean;
  beslutFinns: boolean;
  attributFinns: boolean;
  ingaAtgarder: boolean;
  redigeraLageAtgarder = false;
  redigeraLageAnsDjur = false;
  redigeraLageAttribut = false;
  filtreringsAlternativ = 'alla';
  tidigareVersion = false;
  errorMessage = '';
  showSpinner = true;
  spinnerText = 'Sidan laddas';
  valdAtgardId = '';
  showWarning = false;
  warningText = 'Kommentar måste anges'
  alive = true;

  atgardSelectElement: HTMLSelectElement;
  skapaManuellAtgardBlock: HTMLDivElement;
  laggTillAtgardBekraftaKnapp: HTMLButtonElement;
  redigerbarAnsokanDjurvalfardElements: NodeListOf<HTMLElement>;
  oredigerbarAnsokanDjurvalfardElements: NodeListOf<HTMLElement>;

  attributSelectElement: HTMLSelectElement;
  skapaAttributBlock: HTMLDivElement;
  laggTillAttributBekraftaKnapp: HTMLButtonElement;
//Lyssnar på page refresh
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    if (this.osparadeAndringarFinns()) {
      return false;
    } else {
      return true;
    }
  }

//Lyssnar på page navigation
  canDeactivate() {
    if (this.osparadeAndringarFinns()) {
      if (confirm('Sidan har osparade ändringar. Vill du förtsätta andå?')) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  osparadeAndringarFinns() {
    if (this.redigeraLageAtgarder === true || this.redigeraLageAnsDjur === true || this.redigeraLageAttribut === true) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    this.arendeId = this.route.snapshot.paramMap.get('arendeId');
    this.kundNummer = this.route.snapshot.paramMap.get('kundNummer');

    this.atgardSelectElement = document.querySelector('#manuellAtgardTyp') as HTMLSelectElement;
    this.skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
    this.laggTillAtgardBekraftaKnapp = document.querySelector('#bekraftaLaggTillAtgard') as HTMLButtonElement;
    hanteraLaggTillBekraftaKnappStatus(this.atgardSelectElement, this.laggTillAtgardBekraftaKnapp);

    this.attributSelectElement = document.querySelector('#giltigtAttribut') as HTMLSelectElement;
    this.skapaAttributBlock = document.querySelector('.skapaAttribut');
    this.laggTillAttributBekraftaKnapp = document.querySelector('#bekraftaLaggTillAttribut') as HTMLButtonElement;
    hanteraLaggTillBekraftaKnappStatus(this.attributSelectElement, this.laggTillAttributBekraftaKnapp);

    this.redigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.redigerbarAnsDjurElement');
    this.oredigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.oredigerbarAnsDjurElement');

    this.titleService.setTitle('Farmen - ' + this.kundNummer);

    const arendeParam = {
      arendeid: this.arendeId,
      kundnummer: this.kundNummer
    };

    this.hamtaArendeInformation(arendeParam);
  }

  onStangVarning() {
    this.showWarning = false;
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
      this.errorMessage = err.message;
      this.showSpinner = false;
    }, () => {
      setTimeout(() => {
        this.windowRef.komponentbibliotek.init();
        kontrolleraFlikar(this.arende);
      }, 500);
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

  uppdateraPPNNumber(ppnvaluesHolder: HTMLInputElement) {
    this.ansokanDjurvalfard.ppnLista = [];
    this.ansokanDjurvalfard.ppnLista = ppnvaluesHolder.value.split(',');
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
    this.redigeraLageAnsDjur = false;
    this.ansokanDjurvalfard = null;
    this.ansokanDjurvalfard = cloneDeep(this.oandradeAnsokanDjurvalfard);
    for (let i = 0; i < this.redigerbarAnsokanDjurvalfardElements.length; i++) {
      (this.redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'none';
    }
    for (let j = 0; j < this.oredigerbarAnsokanDjurvalfardElements.length; j++) {
      (this.oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'block';
    }
    setTimeout(() => {
      this.windowRef.komponentbibliotek.initTagsinputs();
    }, 500);
  }

  sparaAnsDjurValView(button: HTMLButtonElement, ansokanDjurvalfard: AnsokanDjurvalfard) {
    if (this.valdArendeversion.gallande === 'J' && this.arende.status === 'REG') {

      this.redigeraLageAnsDjur = false;
      this.showSpinner = true;
      this.spinnerText = 'Uppdatering pågår';
      this.sparaAnsokanDjurvalfard();

      for (let i = 0; i < this.redigerbarAnsokanDjurvalfardElements.length; i++) {
        (this.redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'none';
      }
      for (let j = 0; j < this.oredigerbarAnsokanDjurvalfardElements.length; j++) {
        (this.oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'block';
      }

    }
  }

  sparaAnsokanDjurvalfard() {
    this.apiService.postData(environment.redigeraAnsokanUrl, this.ansokanDjurvalfard).subscribe(
      (data: string) => {
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = error.error.svar;
      },
      () => {
        this.hamtaAnsokanDjurvalfard();
      }
    );
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
      this.windowRef.komponentbibliotek.initAccordions();
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
            this.windowRef.komponentbibliotek.initAccordions();
          }, 500);
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
          deselectLaggtillSelectElement(this.atgardSelectElement);
          setTimeout(() => {
            this.windowRef.komponentbibliotek.init();
          }, 100);
        }
      );
  }

  hamtaDataForValdFlik(flikNamn) {
    if (flikNamn === 'ansokanDjurvalfard') {
      this.hamtaAnsokanDjurvalfard();
    } else if (flikNamn === 'attribut') {
      this.hamtaAttribut();
    } else if (flikNamn === 'beslut') {
      this.hamtaBeslut();
    }
  }

  hamtaAnsokanDjurvalfard() {
    this.apiService.getData(`${environment.ansokanDjurvalfardUrl}/${this.valdArendeversion.arendeversionId}/${this.arende.arendeTyp}`).subscribe(
      (data: any) => {
        this.ansokanDjurvalfard = data;
        this.errorMessage = '';
        setTimeout(() => {
          this.windowRef.komponentbibliotek.initTagsinputs();
          this.showSpinner = false;
        }, 500);
      },
      (err: any) => {
        this.errorMessage = err.message;
      });
  }

  hamtaAttribut() {
    const arendeParam = {
      arendeid: this.valdArendeversion.arendeId,
      arendeversionid: this.valdArendeversion.arendeversionId,
      arendetyp: this.arende.arendeTyp,
      arendestatus: this.arende.status,
      ansokanstyp: this.arende.ansokansTyp
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
        this.errorMessage = err.message;
      });
  }

  hamtaGiltigaAttribut() {
    if (this.valdArendeversion.gallande === 'J' && this.arende.status === 'REG') {
      this.valtAttribut = new Attribut('', '', '', '', '', [], '', '', '', '', '');

      const arendeParam = {
        arendetyp: this.arende.arendeTyp,
        ansokanstyp: this.arende.ansokansTyp,
        arendeid: this.arende.arendeId,
        arendeversionid: this.valdArendeversion.arendeversionId,
        arendestatus: this.arende.status
      };

      this.apiService.getDataMedParametrar(environment.giltigaAttributUrl, arendeParam).subscribe(
        (data: any) => {
          this.errorMessage = '';
          this.giltigtAttributLista = data;
          this.giltigtAttributLista.unshift(this.valtAttribut);
          this.skapaAttributBlock.style.display = 'block';
          setTimeout(() => {
            this.windowRef.komponentbibliotek.init();
          }, 100);
        },
        (err: any) => {
          this.errorMessage = err.message;
        });
    }
  }

  hanteraRedigeraAttribut(attribut: Attribut) {
    this.valtAttributId = attribut.id;
    if (this.redigeraLageAttribut === false) {
      this.redigeraLageAttribut = true;
      this.oandratAttributLista.push(
        {
          attributId: attribut.id,
          attribut: cloneDeep(attribut)
        });
    } else {
      showToaster('Du har inte sparat dina ändringar.');
    }
  }

  hanteraAvbrytAttribut(attribut: Attribut, index) {
    this.redigeraLageAttribut = false;
    const gammalValueIndex = this.oandratAttributLista.findIndex(obj => obj.attributId === attribut.id);
    this.attributLista[index] = cloneDeep(this.oandratAttributLista[gammalValueIndex].attribut);
    this.oandratAttributLista.splice(gammalValueIndex, 1);
  }

  sparaRedigeratAttribut(attribut, event) {
    if (this.valdArendeversion.gallande === 'J' && this.arende.status === 'REG') {
      this.redigeraLageAttribut = false;
      const gammalValueIndex = this.oandratAttributLista.findIndex(obj => obj.attributId === attribut.id);
      this.oandratAttributLista.splice(gammalValueIndex, 1);
      const sparaKnapp = event.target as HTMLButtonElement;
      sparaKnapp.disabled = true;
      this.apiService.postData(environment.redigeraAttributUrl, attribut).subscribe(
        (data: Attribut) => {
          const attributIndex = this.attributLista.findIndex(item => item.id === data.id);
          this.attributLista[attributIndex] = data;
          sparaKnapp.disabled = false;
          this.errorMessage = '';
        },
        (err: any) => {
          this.errorMessage = err.error.svar;
          sparaKnapp.disabled = false;
        }
      );
    }
  }

  skapaAttribut() {
    if (this.valdArendeversion.gallande === 'J' && this.arende.status === 'REG') {
      this.apiService.postData(environment.skapaAttributUrl, this.valtAttribut)
        .subscribe(
          (data: Attribut) => {
            this.attributFinns = true;
            this.attributSelectElement.selectedIndex = -1;
            this.attributLista.push(data);
            this.errorMessage = '';
            showToaster('Attributet har lagts till.');
          },
          (err: any) => {
            if (err.error.svar.includes('Attributet finns')) {
              showToaster(err.error.svar);
            } else {
              this.errorMessage = err.error.svar;
            }
          },
          () => {
            deselectLaggtillSelectElement(this.attributSelectElement);
            setTimeout(() => {
              this.windowRef.komponentbibliotek.init();
            }, 100);
          }
        );
    }
  }

  taBortAttribut(attribut, event) {
    if (this.valdArendeversion.gallande === 'J' && this.arende.status === 'REG') {
      const taBortKnapp = event.target as HTMLButtonElement;
      taBortKnapp.disabled = true;
      this.apiService.postData(environment.taBortAttributUrl, attribut).subscribe(
        (data: any) => {
          this.attributLista = this.attributLista.filter(item => item.id !== attribut.id);
          taBortKnapp.disabled = false;
          this.errorMessage = '';
        },
        (err: any) => {
          this.errorMessage = err.error.svar;
          taBortKnapp.disabled = false;
        }
      );
    }
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
    kontrolleraFlikar(this.arende);
  }

  avbrytLaggTillAtgard() {
    avbrytLaggTill(this.skapaManuellAtgardBlock, this.atgardSelectElement);
  }

  avbrytLaggTillAttribut() {
    avbrytLaggTill(this.skapaAttributBlock, this.attributSelectElement);
  }

}

