import { AtgardTypModel } from './atgardTypModel';

export class Atgard {
    atgardTypModel: AtgardTypModel;
    id: string;
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
    constructor(
        atgardTypModel: AtgardTypModel,
        id: string,
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
    ) {
        this.atgardTypModel = atgardTypModel;
        this.id = id;
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
    }
}