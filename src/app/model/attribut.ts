export class Attribut {
    id: string;
    arendeId: string;
    arendeversionId: string;
    namn: string;
    varde: string;
    giltigaVarden: string[];
    datatyp: string;
    kod: string;
    arendeStatus: string;
    arendeTyp: string;
    ansokansTyp: string;
    constructor(
        id: string,
        arendeId: string,
        arendeversionId: string,
        namn: string,
        varde: string,
        giltigaVarden: string[],
        datatyp: string,
        kod: string,
        arendeStatus: string,
        arendeTyp: string,
        ansokansTyp: string
    ) {
        this.id = id;
        this.arendeId = arendeId;
        this.arendeversionId = arendeversionId;
        this.namn = namn;
        this.varde = varde;
        this.giltigaVarden = giltigaVarden;
        this.datatyp = datatyp;
        this.kod = kod;
        this.arendeStatus = arendeStatus;
        this.arendeTyp = arendeTyp;
        this.ansokansTyp = ansokansTyp;
    }
}