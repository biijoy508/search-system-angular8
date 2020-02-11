
export class Arende {
    stodAr: string;
    kundNummerAlfaNumerisk: string;
    kundNamn: string;
    status: string;
    arendeTyp: string;
    ansokansTyp: string;
    myndighet: string;
    kundOrgNummer: string;
    arendeId: string;
    ankomstDatum: string;
    constructor(
      stodAr: string,
      kundNummerAlfaNumerisk: string,
      kundNamn: string,
      status: string,
      arendeTyp: string,
      ansokansTyp: string,
      myndighet: string,
      kundOrgNummer: string,
      arendeId: string,
      ankomstDatum: string
    ) {
        this.kundNummerAlfaNumerisk = kundNummerAlfaNumerisk;
        this.stodAr = stodAr;
        this.arendeTyp = arendeTyp;
        this.ansokansTyp = ansokansTyp;
        this.myndighet = myndighet;
        this.ankomstDatum = ankomstDatum;
        this.arendeId = arendeId;
        this.kundNamn = kundNamn;
        this.kundOrgNummer = kundOrgNummer;
        this.status = status;
    }
}
