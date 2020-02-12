export class Attribut {
    id: string;
    arendeId: string;
    arendeversionId: string;
    namn: string;
    varde: string;
    datatyp: string;
    kod: string;
    arendeStatus: string;
    arendeTyp: string;
    constructor(
        id: string,
        arendeId: string,
        arendeversionId: string,
        namn: string,
        varde: string,
        datatyp: string,
        kod: string,
        arendeStatus: string,
        arendeTyp: string
    ) {
        this.id = id;
        this.arendeId = arendeId;
        this.arendeversionId = arendeversionId;
        this.namn = namn;
        this.varde = varde;
        this.datatyp = datatyp;
        this.kod = kod;
        this.arendeStatus = arendeStatus;
        this.arendeTyp = arendeTyp;
    }
}