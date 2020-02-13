import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements AfterViewInit {
  @Input() showSpinner: boolean;
  @Input() spinnerText: string;
  @Input() sokSida: boolean;
  @Output() avbrytSok = new EventEmitter();

  avbrytSokning() {
      this.avbrytSok.emit();
  }

  constructor() { }

  ngAfterViewInit() {

   
  }
}