export class AtgardTyp {
    id: string;
    arendeId: string;
    kod: string;
    text: string;
    stodAr: string;
    constructor(
        id: string,
        arendeId: string,
        kod: string,
        text: string,
        stodAr: string
    ) {
        this.id = id;
        this.arendeId = arendeId;
        this.kod = kod;
        this.text = text;
        this.stodAr = stodAr;
    }
}