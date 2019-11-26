export class Atgard {
    kod: string;
    beskrivning: string;
    statusKod: string;
    statusText: string;
    statusDatum: string;
    kommentar: string;
    arendeNummer: string;
    regDatum: string;
    uppdateradDatum: string;
    uppdateradAv: string;
    manuell: string;
    constructor(
        kod: string,
        beskrivning: string,
        statusKod: string,
        statusText: string,
        statusDatum: string,
        kommentar: string,
        arendeNummer: string,
        regDatum: string,
        uppdateradDatum: string,
        uppdateradAv: string,
        manuell: string
    ) {
        this.kod = kod;
        this.beskrivning = beskrivning;
        this.statusKod = statusKod;
        this.statusText = statusText;
        this.statusDatum = statusDatum;
        this.kommentar = kommentar;
        this.arendeNummer = arendeNummer;
        this.regDatum = regDatum;
        this.uppdateradDatum = uppdateradDatum;
        this.uppdateradAv = uppdateradAv;
        this.manuell = manuell;
    }
}