
export class SokFilter {
    stodAr: string;
    kundNummerAlfaNumerisk: string;
    arendeTypList: string[];
    ansokansTypList: string[];
    myndighet: string;
    franStatus: string;
    tillStatus: string;
    constructor(
        stodAr: string,
        kundNummerAlfaNumerisk: string,
        arendeTypList: string[],
        ansokansTypList: string[],
        myndighet: string,
        franStatus: string,
        tillStatus: string
    ) {
        this.kundNummerAlfaNumerisk = kundNummerAlfaNumerisk;
        this.stodAr = stodAr;
        this.arendeTypList = arendeTypList;
        this.ansokansTypList = ansokansTypList;
        this.myndighet = myndighet;
        this.franStatus = franStatus;
        this.tillStatus = tillStatus;
    }
}
