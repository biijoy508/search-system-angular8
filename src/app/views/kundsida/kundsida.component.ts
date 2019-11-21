import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Arende } from 'src/app/model/arende';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';
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

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.windowRef = window;
    this.arende = new Arende('', '',  '', '', '', '', '', '', '', '');
  }


  ngOnInit() {
    this.windowRef.komponentbibliotek.init();
  }

  ngAfterViewInit() {
    this.arendeNummer = this.route.snapshot.paramMap.get('arendeNummer')

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
}
