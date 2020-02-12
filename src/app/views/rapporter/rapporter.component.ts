import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rapporter',
  templateUrl: './rapporter.component.html',
  styleUrls: ['./rapporter.component.scss']
})
export class RapporterComponent implements OnInit, AfterViewInit {
  windowRef: any;
  rapportVal = 'BESLUT003 - Granskningslista utbetalning - bifall';
  filnamn = this.rapportVal + '-2020-02-12-1112';
  filformat = 'PDF';
  successStatus = false;
  constructor() {
    this.windowRef = window;
  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.windowRef.komponentbibliotek.init();
  }
  chagedValue() {
    this.filnamn = this.rapportVal + '-2020-02-12-1112';
  }
  togglesuccessBanner() {
    this.successStatus = !this.successStatus;
  }

}
