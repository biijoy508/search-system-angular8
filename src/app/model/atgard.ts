export class Atgard {
    id: string;
    kod: string;
    beskrivning: string;
    statusKod: string;
    statusText: string;
    statusDatum: string;
    kommentar: string;
    arendeId: string;
    regDatum: string;
    registreradAv: string;
    uppdateradDatum: string;
    uppdateradAv: string;
    manuell: string;
    mojligaStatusar: string[];
    constructor(
        id: string,
        kod: string,
        beskrivning: string,
        statusKod: string,
        statusText: string,
        statusDatum: string,
        kommentar: string,
        arendeId: string,
        regDatum: string,
        registreradAv: string,
        uppdateradDatum: string,
        uppdateradAv: string,
        manuell: string,
        mojligaStatusar: string[]
    ) {
        this.id = id;
        this.kod = kod;
        this.beskrivning = beskrivning;
        this.statusKod = statusKod;
        this.statusText = statusText;
        this.statusDatum = statusDatum;
        this.kommentar = kommentar;
        this.arendeId = arendeId;
        this.regDatum = regDatum;
        this.registreradAv = registreradAv;
        this.uppdateradDatum = uppdateradDatum;
        this.uppdateradAv = uppdateradAv;
        this.manuell = manuell;
        this.mojligaStatusar = mojligaStatusar;
    }
}