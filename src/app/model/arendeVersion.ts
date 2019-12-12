export class ArendeVersion {
    arendeversionId: string;
    arendeId: string;
    versionsNummer: string;
    beslutsId: string;
    beslutsDatum: string;
    berakningsDatum: string;
    gallande: string;
    presentationsText: string;
    constructor(
        arendeversionId: string,
        arendeId: string,
        versionsNummer: string,
        beslutsId: string,
        beslutsDatum: string,
        berakningsDatum: string,
        gallande: string,
        presentationsText: string
    ) {
        this.arendeversionId = arendeversionId;
        this.arendeId = arendeId;
        this.versionsNummer = versionsNummer;
        this.beslutsId = beslutsId;
        this.beslutsDatum = beslutsDatum;
        this.berakningsDatum = berakningsDatum;
        this.gallande = gallande;
        this.presentationsText = presentationsText;
    }
}
