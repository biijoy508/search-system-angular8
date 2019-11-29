import { Component, AfterViewInit } from '@angular/core';
import { Arende } from 'src/app/model/arende';
import { Atgard } from 'src/app/model/atgard';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
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
  adress: string;
  atgardLista: Atgard[] = [];

  PPNnummer: string = "43,42";
  antalDjur: string = '321';
  antalDjurenheter: string = '220';

  filtreringsAlternativ: string = 'alla';


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.windowRef = window;
    this.arende = new Arende('', '', '', '', '', '', '', '', '', '');

  }

  ngAfterViewInit() {

    this.windowRef.komponentbibliotek.init();
    this.atgardLista.push(new Atgard('756715', '', 'ÖPP', '', '', '', '', '', '', '', ''));
    this.arendeId = this.route.snapshot.paramMap.get('arendeId');

    this.apiService.getChainedDataArendeInformation(this.arendeId).subscribe(
      (data: any) => {
        this.atgardLista = [];
        this.arende = data[0];
        this.adress = 'Volymgatan 12, 555 55 Volymstad';
        this.atgardLista = data[1];
        console.log(this.atgardLista);
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
    console.log(filtreringsAlternativ);
    this.filtreringsAlternativ = filtreringsAlternativ;
  }
  laggTillAtgard() {
    let skapamanuelatgardBlock = document.querySelector('.skapaManuelAtgard') as HTMLDivElement;
    skapamanuelatgardBlock.style.display = "block";
  }

  avbrytLaggtillatgard() {
    let skapamanuelatgardBlock = document.querySelector('.skapaManuelAtgard') as HTMLDivElement;
    skapamanuelatgardBlock.style.display = "none";
  }
}
