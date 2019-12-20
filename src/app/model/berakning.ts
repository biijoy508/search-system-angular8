export class Berakning {
    berakningsTyp: string;
    varde: string;
    enhet: string;
    constructor(
        berakningsTyp: string,
        varde: string,
        enhet: string
    ) {
        this.berakningsTyp = berakningsTyp;
        this.varde = varde;
        this.enhet = enhet;
    }
}