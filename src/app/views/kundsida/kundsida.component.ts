import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Arende } from 'src/app/model/arende';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-kundsida',
  templateUrl: './kundsida.component.html',
  styleUrls: ['./kundsida.component.scss']
})
export class KundsidaComponent implements AfterViewInit {
  windowRef: any;
  arende: Arende;
  arendeNummer: any;
  kundNummerAlfaNumerisk: any;
  adress: string;

  PPNnummer: string = '43,42,41';
  antalDjur: string = '321';
  antalDjurenheter: string = '220';



  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.windowRef = window;
    this.arende = new Arende('', '',  '', '', '', '', '', '', '', '');
  }


  ngOnInit() {
    this.windowRef.komponentbibliotek.init();
  }

  ngAfterViewInit() {
    this.arendeNummer = this.route.snapshot.paramMap.get('arendeNummer');

    this.kundNummerAlfaNumerisk = this.route.snapshot.paramMap.get('kundNummerAlfaNumerisk');

    const ARENDENUMMER = {
      arendenummer: this.arendeNummer
      , kundnummer: this.kundNummerAlfaNumerisk
    };

    this.apiService.getDataMedParametrar(environment.arendenUrl, ARENDENUMMER).subscribe(
      (data: Arende[]) => {
        this.arende = data[0];
        this.adress = 'Volymgatan 12, 555 55 Volymstad';
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
}
