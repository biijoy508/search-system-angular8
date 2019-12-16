export class Attribut {

    arendeId: string;
    arendeversionId: string;
    namn: string;
    varde: string;
    datatyp: string;
    constructor(
        arendeId: string,
        arendeversionId: string,
        namn: string,
        varde: string,
        datatyp: string
    ) {
        this.arendeId = arendeId;
        this.arendeversionId = arendeversionId;
        this.namn = namn;
        this.varde = varde;
        this.datatyp = datatyp;
    }
}