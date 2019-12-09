export class Attribut {
    arendeversionId: string;
    varde: string;
    objDatatyp: string;
    grundDatatyp: string;
    constructor(
        arendeversionId: string,
        varde: string,
        objDatatyp: string,
        grundDatatyp: string
    ) {
        this.arendeversionId = arendeversionId;
        this.varde = varde;
        this.objDatatyp = objDatatyp;
        this.grundDatatyp = grundDatatyp;
    }
}