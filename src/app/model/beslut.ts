export class Beslut {
    beslutsId: string;
    arendeversionId: string;
    beslutsTyp: string;
    berakningsDatum: string;
    beslutsDatum: string;
    gallande: string;
    constructor(
        beslutsId: string,
        arendeversionId: string,
        beslutsTyp: string,
        berakningsDatum: string,
        beslutsDatum: string,
        gallande: string
    ) {
        this.beslutsId = beslutsId;
        this.arendeversionId = arendeversionId;
        this.beslutsTyp = beslutsTyp;
        this.berakningsDatum = berakningsDatum;
        this.beslutsDatum = beslutsDatum;
        this.gallande = gallande;
    }
}
