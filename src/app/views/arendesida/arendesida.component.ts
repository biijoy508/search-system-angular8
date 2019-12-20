import { Component, AfterViewInit } from '@angular/core';
import { Arende } from 'src/app/model/arende';
import { ArendeVersion } from 'src/app/model/arendeVersion';
import { Atgard } from 'src/app/model/atgard';
import { ManuellAtgard } from 'src/app/model/manuellAtgard';
import { AnsokanDjurvalfard } from 'src/app/model/ansokanDjurvalfard';
import { Attribut } from 'src/app/model/attribut';
import { Beslut } from 'src/app/model/beslut';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Berakning } from 'src/app/model/berakning';

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
  atgardskodLista: ManuellAtgard[] = [];
  valdAtgardskod: string;
  arendeVersionLista: ArendeVersion[] = [];
  ansokanDjurvalfard: AnsokanDjurvalfard;
  attributLista: Attribut[] = [];
  valdArendeversion: ArendeVersion;
  beslut: Beslut;

  PPNnummer = '43,42';

  filtreringsAlternativ = 'alla';

  toasterMessage = '';
  tidigareVersion = false;
  valdFlik = 'ansokanDjurvalfard';


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.windowRef = window;
    this.arende = new Arende('', '', '', '', '', '', '', '', '', '');
    this.ansokanDjurvalfard = new AnsokanDjurvalfard([], '');
    let berakning = new Berakning('','','');
    this.beslut = new Beslut('', '', '', '', '', '', berakning, [], []);
  }

  ngAfterViewInit() {

    this.windowRef.komponentbibliotek.init();
    this.arendeId = this.route.snapshot.paramMap.get('arendeId');
    this.kundNummer = this.route.snapshot.paramMap.get('kundNummer');

    const arendeParam = {
      arendeid: this.arendeId,
      kundnummer: this.kundNummer
    };

    this.apiService.getChainedDataArendeInformation(arendeParam).subscribe(
      (data: any) => {
        this.atgardLista = [];
        this.arendeVersionLista = [];
        this.arende = data[0];
        this.arendeVersionLista = data[1];
        this.atgardLista = data[2];
        this.valdArendeversion = this.arendeVersionLista.find(entity => entity.gallande === 'J');
        if (this.arende.ansokansTyp !== 'UTBET') {
          const utbetFlikar = document.querySelector('#utbetFlikar') as HTMLElement;
          if (utbetFlikar) {
            utbetFlikar.style.display = 'none';
          }
        } else {
          this.toggleAktivFlik(this.arende.status);
        }
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      });

  }

  toggleAktivFlik(arendeStatus: string) {
    if (arendeStatus === 'BESL' || arendeStatus === 'BER') {
      document.getElementById('beslut').click();
    } else {
      document.getElementById('ansokanDjurvalfard').click();
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

  laggTillAtgard() {
    const skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
    skapaManuellAtgardBlock.style.display = 'block';
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
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      });
  }

  hamtaAttribut() {

    const arendeParam = {
      arendeid: this.valdArendeversion.arendeId,
      arendeversionid: this.valdArendeversion.arendeversionId,
      arendetyp: this.arende.arendeTyp
    }

    this.apiService.getDataMedParametrar(environment.attributUrl, arendeParam).subscribe(
      (data: any) => {
        this.attributLista = data;
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      });
  }

  hamtaBeslut() {


    if(this.arende.status === 'BER' || this.arende.status === 'BESL') {
    const arendeParam = {
      arendeid: this.valdArendeversion.arendeId,
      arendeversionid: this.valdArendeversion.arendeversionId
    }

    this.apiService.getDataMedParametrar(environment.beslutInfoUrl, arendeParam).subscribe(
      (data: any) => {
        this.beslut = data;
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      });

    }

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

}
