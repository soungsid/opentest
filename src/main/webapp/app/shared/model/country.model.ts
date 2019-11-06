export interface ICountry {
  id?: number;
  libelle?: string;
  code?: string;
  utilisateurId?: number;
}

export class Country implements ICountry {
  constructor(public id?: number, public libelle?: string, public code?: string, public utilisateurId?: number) {}
}
