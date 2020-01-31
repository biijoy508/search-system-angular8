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

    const arendeParam = {
      arendeid: this.arendeId,
      kundnummer: this.kundNummer
    };

    this.titleService.setTitle('Farmen - ' + this.kundNummer);

    this.apiService.getChainedDataArendeInformation(arendeParam).pipe(takeWhile(() => this.alive)).subscribe(
      (data: any) => {
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
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
        this.showSpinner = false;
      },
      () => {
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
      }
     );
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
      const redigera = document.querySelectorAll('.redigeraView');
      const vanligt = document.querySelectorAll('.vanligt');
      for (let i = 0; i < redigera.length; i++) {
        (redigera[i] as HTMLDivElement).style.display = 'block';
      }
      for (let j = 0; j < vanligt.length; j++) {
        (vanligt[j] as HTMLDivElement).style.display = 'none';
      }
    } else if (button.innerText === 'Spara') {
      button.innerText = 'Redigera';
      const redigera = document.querySelectorAll('.redigeraView');
      const vanligt = document.querySelectorAll('.vanligt');
      for (let i = 0; i < redigera.length; i++) {
        (redigera[i] as HTMLDivElement).style.display = 'none';
      }
      for (let j = 0; j < vanligt.length; j++) {
        (vanligt[j] as HTMLDivElement).style.display = 'block';
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

  skapaManuellAtgard(e) {

    let laggTillKnapp = e.target;
    laggTillKnapp.disabled = true;

    this.apiService.postData(environment.skapaManuellAtgardUrl, this.valdAtgardTyp)
      .subscribe(
        (data: Atgard) => {
          this.atgardLista.push(data);
          setTimeout(() => {
            this.windowRef.komponentbibliotek.init();
          }, 100);
          this.errorMessage = '';
          this.showToaster("Åtgärden har lagts till.");
          laggTillKnapp.disabled = false;
        },
        (err: any) => {
          this.errorMessage = err.error.svar;
          laggTillKnapp.disabled = false;
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
        const skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
        skapaManuellAtgardBlock.style.display = 'block';
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
      });

  }

  redigeraAtgard(atgard, e) {

    if(atgard.statusKod === 'ÖPP' || (atgard.kommentar != null && atgard.kommentar !== '')) {
      
      let sparaKnapp = e.target;
      sparaKnapp.disabled = true;
      
      this.apiService.postData(environment.redigeraAtgardUrl, atgard).subscribe(
        (data: Atgard) => {
          
          let atgardIndex = this.atgardLista.findIndex(item => item.id == data.id);
          this.atgardLista[atgardIndex] = data;
          this.redigeraLageAtgarder = false;
          setTimeout(() => {
            this.windowRef.komponentbibliotek.init();
          }, 5000);
          sparaKnapp.disabled = false;
          this.errorMessage = '';
        },
        (err: any) => {
          this.errorMessage = err.error.svar;
          sparaKnapp.disabled = false;
        }
      );
    } else {
      this.showWarning = true;
    }

  }

  toggleRedigeraLageAtgard(e, index) {

    this.valdAtgard = this.atgardLista[index];
    if (e.target.innerText === 'Redigera') {
      this.redigeraLageAtgarder = true;
    } else if (e.target.innerText === 'Avbryt') {
      this.redigeraLageAtgarder = false;
    }
  }

  avbrytLaggTillAtgard() {
    const skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
    skapaManuellAtgardBlock.style.display = 'none';
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
