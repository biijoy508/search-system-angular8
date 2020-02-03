import { Component, AfterViewInit } from '@angular/core';
import { Arende } from 'src/app/model/arende';
import { ArendeVersion } from 'src/app/model/arendeVersion';
import { Atgard } from 'src/app/model/atgard';
import { AtgardTypModel } from 'src/app/model/atgardTypModel';
import { AnsokanDjurvalfard } from 'src/app/model/ansokanDjurvalfard';
import { Attribut } from 'src/app/model/attribut';
import { Beslut } from 'src/app/model/beslut';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Berakning } from 'src/app/model/berakning';
import { Title } from '@angular/platform-browser';
import { takeWhile } from 'rxjs/operators';


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

  toasterMessage = '';
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

  redigerbarAnsokanDjurvalfardElements: NodeListOf<Element>;
  oredigerbarAnsokanDjurvalfardElements: NodeListOf<Element>;


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
    this.redigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.redigerbarAnsDjurElement');
    this.oredigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.oredigerbarAnsDjurElement');

    const arendeParam = {
      arendeid: this.arendeId,
      kundnummer: this.kundNummer
    };

    this.hanteraLaggTillAtgardBekraftaKnappStatus();

    this.titleService.setTitle('Farmen - ' + this.kundNummer);

    this.hamtaArendeInformation(arendeParam);
  }

  private hanteraLaggTillAtgardBekraftaKnappStatus() {
    if (this.atgardSelectElement.selectedIndex === 0 || this.atgardSelectElement.selectedIndex === -1) {
      this.laggTillAtgardBekraftaKnapp.setAttribute('disabled', 'disabled');
    }
    this.atgardSelectElement.addEventListener('change', () => {
      if (this.atgardSelectElement.selectedIndex === 0 || this.atgardSelectElement.selectedIndex === -1) {
        this.laggTillAtgardBekraftaKnapp.setAttribute('disabled', 'disabled');
      } else {
        this.laggTillAtgardBekraftaKnapp.removeAttribute('disabled');
      }
    });
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
      if (this.arende.ansokansTyp === 'UTBET') {
        this.toggleAktivFlik(this.arende.status);
        this.kontrolleraAnsokanDjurvalfard(this.arende.arendeTyp);
      } else {
        const utbetFlikar = document.querySelector('#utbetFlikar') as HTMLElement;
        if (utbetFlikar) {
          utbetFlikar.style.display = 'none';
        }
      }
      setTimeout(() => {
        this.showSpinner = false;
      }, 300);
    });
  }

  ngOnDestroy() {
    this.hideSpinner();
  }

  hideSpinner() {
    this.alive = false;
    this.showSpinner = false;
  }

  toggleAktivFlik(arendeStatus: string) {
    if (arendeStatus === 'BESL' || arendeStatus === 'BER') {
      document.getElementById('beslut').click();
    } else {
      document.getElementById('ansokanDjurvalfard').click();
    }
  }

  kontrolleraAnsokanDjurvalfard(arendeTyp: string) {
    if (arendeTyp !== 'FARERS' && arendeTyp !== 'KLOVERS' && arendeTyp !== 'SUGGERS') {
      const ansokanDjurvalfardElement = document.getElementById('ansokanDjurvalfard') as HTMLElement;
      ansokanDjurvalfardElement.style.display = 'none';
      ansokanDjurvalfardElement.setAttribute('aria-selected', 'false');
      document.getElementById('attribut').click();
    }
  }

  redigeraView(button: HTMLButtonElement) {
    if (button.innerText === 'Redigera') {
      button.innerText = 'Spara';
      for (let i = 0; i < this.redigerbarAnsokanDjurvalfardElements.length; i++) {
        (this.redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'block';
      }
      for (let j = 0; j < this.oredigerbarAnsokanDjurvalfardElements.length; j++) {
        (this.oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'none';
      }
    } else if (button.innerText === 'Spara') {
      button.innerText = 'Redigera';
      for (let i = 0; i < this.redigerbarAnsokanDjurvalfardElements.length; i++) {
        (this.redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'none';
      }
      for (let j = 0; j < this.oredigerbarAnsokanDjurvalfardElements.length; j++) {
        (this.oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'block';
      }
    }
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

  showToaster(message) {
    const toaster = document.querySelector('.c-toaster') as HTMLDivElement;
    toaster.style.display = 'block';
    this.toasterMessage = message;
    setTimeout(() => {
      this.closeToaster();
    }, 2000);
  }

  closeToaster() {
    const toaster = document.querySelector('.c-toaster') as HTMLDivElement;
    toaster.style.display = 'none';
    this.toasterMessage = '';
  }

  skapaManuellAtgard(event) {
    this.apiService.postData(environment.skapaManuellAtgardUrl, this.valdAtgardTyp)
      .subscribe(
        (data: Atgard) => {
          this.ingaAtgarder = false;
          this.atgardSelectElement.selectedIndex = -1;
          this.atgardLista.push(data);
          this.errorMessage = '';
          this.showToaster('Åtgärden har lagts till.');
        },
        (err: any) => {
          if (err.error.svar.includes('Åtgärden finns')) {
            this.showToaster(err.error.svar);
          } else {
            this.errorMessage = err.error.svar;
          }
        },
        () => {
          this.deselectLaggtillAtgardSelectElement();
          setTimeout(() => {
            this.windowRef.komponentbibliotek.init();
          }, 100);
        }
      );

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
  toggleRedigeraLageAtgard(event, index) {
    this.valdAtgard = this.atgardLista[index];
    if (event.target.innerText === 'Redigera') {
      this.redigeraLageAtgarder = true;
    } else if (event.target.innerText === 'Avbryt') {
      this.redigeraLageAtgarder = false;
    }
  }

  avbrytLaggTillAtgard() {
    this.deselectLaggtillAtgardSelectElement();
    this.skapaManuellAtgardBlock.style.display = 'none';
  }

  deselectLaggtillAtgardSelectElement() {
    this.atgardSelectElement.selectedIndex = -1;
    this.atgardSelectElement.dispatchEvent(new Event('change'));
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

}
