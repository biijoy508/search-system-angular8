export class AtgardTypModel {
    id: string;
    kod: string;
    text: string;
    mojligaStatusar: string[];
    arendeId: string;
    stodAr: string;
    constructor(
        id: string,
        kod: string,
        text: string,
        mojligaStatusar: string[],
        arendeId: string,
        stodAr: string
    ) {
        this.id = id;
        this.kod = kod;
        this.text = text;
        this.mojligaStatusar = mojligaStatusar;
        this.arendeId = arendeId;
        this.stodAr = stodAr;
    }
}