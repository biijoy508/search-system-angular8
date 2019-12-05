import { Component, AfterViewInit } from '@angular/core';
import { Arende } from 'src/app/model/arende';
import { ArendeVersion } from 'src/app/model/arendeVersion';
import { Atgard } from 'src/app/model/atgard';
import { ManuellAtgard } from 'src/app/model/manuellAtgard';
import { AnsokanDjurvalfard } from 'src/app/model/ansokanDjurvalfard';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-kundsida',
  templateUrl: './kundsida.component.html',
  styleUrls: ['./kundsida.component.scss']
})
export class KundsidaComponent implements AfterViewInit {
  windowRef: any;
  arende: Arende;
  arendeId: any;
  stodAr: any;
  adress: string;
  atgardLista: Atgard[] = [];
  atgardskodLista: ManuellAtgard[] = [];
  valdAtgardskod: string;
  arendeVersionLista: ArendeVersion[] = [];
  ansokanDjurvalfard: AnsokanDjurvalfard;

  PPNnummer = '43,42';

  filtreringsAlternativ = 'alla';

  toasterMessage = '';
  tidigareVersion = false;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.windowRef = window;
    this.arende = new Arende('', '', '', '', '', '', '', '', '', '');
    this.ansokanDjurvalfard = new AnsokanDjurvalfard([], '', '');
  }

  ngAfterViewInit() {

    this.windowRef.komponentbibliotek.init();
    this.arendeId = this.route.snapshot.paramMap.get('arendeId');
    this.stodAr = this.route.snapshot.paramMap.get('stodAr');
  
    this.apiService.getChainedDataArendeInformation(this.arendeId, this.stodAr).subscribe(
      (data: any) => {
        this.atgardLista = [];
        this.atgardskodLista = [];
        this.arendeVersionLista = [];
        this.ansokanDjurvalfard = data.data[0];
        this.arende = data.data[1];
        this.adress = 'Volymgatan 12, 555 55 Volymstad';
        this.atgardLista = data.data[2];
        this.atgardskodLista = data.data[3];
        this.arendeVersionLista = data.data[4];
        
        setTimeout(() => {
          this.windowRef.komponentbibliotek.init();
        }, 100);
      });

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
    const atgarderUILista = document.querySelectorAll('.c-accordion-group');
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

  /* skapaManuellAtgard() {

    const valdAtgardskodParam = {
      valdAtgardskod: this.valdAtgardskod
    };

    this.apiService.postData(environment.skapaManuellAtgardUrl, valdAtgardskodParam).subscribe(
      (data: string) => {
        console.log(data);
      }
    );
  } */

  laggTillAtgard() {
    const skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
    skapaManuellAtgardBlock.style.display = 'block';
  }

  avbrytLaggTillAtgard() {
    const skapaManuellAtgardBlock = document.querySelector('.skapaManuellAtgard') as HTMLDivElement;
    skapaManuellAtgardBlock.style.display = 'none';
  }

  visaTidigareVersionText(select: HTMLSelectElement) {
    if (select.value.includes('Aktuell version')) {
      this.tidigareVersion = false;
    } else {
      this.tidigareVersion = true;
    }
  }

}
