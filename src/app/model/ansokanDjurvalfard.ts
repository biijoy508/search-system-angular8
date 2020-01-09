export class AnsokanDjurvalfard {
    ppnLista: string[];
    antalDjur: string;
    antalDjurenheter: string;
    constructor(
        ppnLista: string[],
        antalDjur: string,
        antalDjurenheter: string
    ) {
        this.ppnLista = ppnLista;
        this.antalDjur = antalDjur;
        this.antalDjurenheter = antalDjurenheter;
    }
}