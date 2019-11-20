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

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.windowRef = window;
  }


  ngAfterViewInit() {
    this.windowRef.komponentbibliotek.init();
    
    this.arendeNummer = this.route.snapshot.paramMap.get('arendeNummer');
    console.log(this.arendeNummer);

    this.kundNummerAlfaNumerisk = this.route.snapshot.paramMap.get('kundNummerAlfaNumerisk');
    console.log(this.kundNummerAlfaNumerisk);

    const ARENDENUMMER = {
      arendenummer: this.arendeNummer
      // , kundNummerAlfaNumerisk: this.kundNummerAlfaNumerisk
    };
    
    this.apiService.getDataMedParametrar(environment.arendenUrl, ARENDENUMMER).subscribe(
      (data: Arende[]) => {
        //this.arende = data;
        console.log(data[3].kundOrgNummer);
      });
  }
}
