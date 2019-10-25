import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mass-hantering',
  templateUrl: './mass-hantering.component.html',
  styleUrls: ['./mass-hantering.component.scss']
})
export class MassHanteringComponent implements OnInit {
  arendeSomKommerAttPaverkas = 2200;
  showSpinner = false;
  successStatus = false;
  constructor() { }

  ngOnInit() {
  }

  changearendeSomKommerAttPaverkas() {
    this.arendeSomKommerAttPaverkas = this.arendeSomKommerAttPaverkas - 145;
  }

  andraStatus() {
    this.toogleSpinner();
    setTimeout(() => {
      this.toogleSpinner();
      this.tooglesuccessBanner();
    }, 3500);
  }
  toogleSpinner() {
    this.showSpinner = !this.showSpinner;
  }
  tooglesuccessBanner() {
    this.successStatus = !this.successStatus;
  }

}
