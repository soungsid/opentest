export interface ICategorie {
  id?: number;
  code?: string;
  libelle?: string;
  qcmId?: number;
}

export class Categorie implements ICategorie {
  constructor(public id?: number, public code?: string, public libelle?: string, public qcmId?: number) {}
}
