import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ExcelExporterService } from '../../services/excel-exporter.service';

export interface Rapport {
  title: any;
  varde: any;
}

@Component({
  selector: 'app-rapporter',
  templateUrl: './rapporter.component.html',
  styleUrls: ['./rapporter.component.scss']
})
export class RapporterComponent implements AfterViewInit {
  windowRef: any;
  rapportVal = 'BESLUT003 - Granskningslista utbetalning - bifall';
  filnamn = this.rapportVal;
  filformat = 'PDF';
  successStatus = false;

  rapportLista = [
    {
      MOD_ID: "31878",
      MOD_NAMN: "MILJO_MILJO003",
      BESKRIVNING: "Lista underlag för kontroll ...",
      REFERENS: "ITFF-6782",
      TITEL: "Lista underlag for kontroll"
    },
    {
      MOD_ID: "31879",
      MOD_NAMN: "MILJO_MILJO103",
      BESKRIVNING: "Lista underlag för kontroll ...",
      REFERENS: "ITFF-6782",
      TITEL: "Lista underlag for mer kontroll"
    }
  ];


  constructor(private excelExporterService: ExcelExporterService) {
    this.windowRef = window;
  }

  ngAfterViewInit(): void {
    this.windowRef.komponentbibliotek.init();
  }
  chagedValue() {
    this.filnamn = this.rapportVal;
  }

  skapaRapport() {
    this.excelExporterService.exportAsExcelFile('', this.rapportLista, this.filnamn);
  }
}
