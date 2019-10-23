import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-kundsida',
  templateUrl: './kundsida.component.html',
  styleUrls: ['./kundsida.component.scss']
})
export class KundsidaComponent implements AfterViewInit {
  windowRef: any;
  constructor() {
    this.windowRef = window;
  }
  ngAfterViewInit() {
   this.windowRef.komponentbibliotek.init();
  }

}
