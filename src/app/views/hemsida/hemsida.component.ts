import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hemsida',
  templateUrl: './hemsida.component.html',
  styleUrls: ['./hemsida.component.scss']
})
export class HemsidaComponent implements OnInit {
  arendetyp = '';
  stodar = '';
  anstyp = '';
  noresult = false;
  arendetyp_values = ['FARERS', 'SUGGERS', 'KLOVERS'];
  stodar_values = ['2019', '2018', '2017', '2016'];
  anstyp_values = ['ÅTAG', 'UTBET'];

  constructor() { }

  ngOnInit() {
  }
  confirmbtnClick() {
    this.noresult = !this.noresult;
  }

}
