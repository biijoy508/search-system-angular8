import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Arende } from '../../model/arende';
import { ArendeVersion } from '../../model/arendeVersion';

@Component({
    selector: 'app-arendeinfo',
    templateUrl: './arendeinfo.component.html',
    styleUrls: ['../../views/arendesida/arendesida.component.scss']
})
export class ArendeinfoComponent implements AfterViewInit {
    @Input() arende: Arende;
    @Input() tidigareVersion: boolean;
    @Input() arendeVersionLista: ArendeVersion[] = [];
    @Output() visaTidigareVersion = new EventEmitter<HTMLSelectElement>();

    visaTidigare(select: HTMLSelectElement) {
        this.visaTidigareVersion.emit(select);
    }

    constructor() { }

    ngAfterViewInit() {

    }
}
