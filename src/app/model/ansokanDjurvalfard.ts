export class AnsokanDjurvalfard {
    ppnLista: string[];
    antalDjur: string;
    antalDjurenheter: string;
    arendeversionId: string;
    arendeTyp: string;
    constructor(
        ppnLista: string[],
        antalDjur: string,
        antalDjurenheter: string,
        arendeversionId: string,
        arendeTyp: string
    ) {
        this.ppnLista = ppnLista;
        this.antalDjur = antalDjur;
        this.antalDjurenheter = antalDjurenheter;
        this.arendeversionId = arendeversionId;
        this.arendeTyp = arendeTyp;
    }
}
