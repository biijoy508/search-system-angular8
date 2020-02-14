import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements AfterViewInit {
    @Input() showWarning: boolean;
    @Input() warningText: string;
    @Input() massHantering: boolean;
    @Input() antalPaverkadeArenden: string;
    @Output() stangVarning = new EventEmitter();
    @Output() andraStatus = new EventEmitter();

    stang() {
        this.stangVarning.emit();
    }

    andra() {
        this.andraStatus.emit();
    }

    constructor() { }

    ngAfterViewInit() {


    }
}