import { Berakning } from 'src/app/model/berakning';

export class Beslut {
    beslutsId: string;
    arendeversionId: string;
    beslutsTyp: string;
    berakningsDatum: string;
    beslutsDatum: string;
    gallande: string;
    berakningUtbAterkrav: Berakning;
    berakningarArende: Berakning[];
    berakningarDjurvalfard: Berakning[];
    constructor(
        beslutsId: string,
        arendeversionId: string,
        beslutsTyp: string,
        berakningsDatum: string,
        beslutsDatum: string,
        gallande: string,
        berakningUtbAterkrav: Berakning,
        berakningarArende: Berakning[],
        berakningarDjurvalfard: Berakning[]
    ) {
        this.beslutsId = beslutsId;
        this.arendeversionId = arendeversionId;
        this.beslutsTyp = beslutsTyp;
        this.berakningsDatum = berakningsDatum;
        this.beslutsDatum = beslutsDatum;
        this.gallande = gallande;
        this.berakningUtbAterkrav = berakningUtbAterkrav;
        this.berakningarArende = berakningarArende;
        this.berakningarDjurvalfard = berakningarDjurvalfard;
    }
}
