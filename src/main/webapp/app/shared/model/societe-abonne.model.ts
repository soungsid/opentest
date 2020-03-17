import { Moment } from 'moment';

export interface ISocieteAbonne {
  id?: number;
  name?: string;
  dateAbonnement?: Moment;
  logoContentType?: string;
  logo?: any;
  utilisateurId?: number;
}

export class SocieteAbonne implements ISocieteAbonne {
  constructor(
    public id?: number,
    public name?: string,
    public dateAbonnement?: Moment,
    public logoContentType?: string,
    public logo?: any,
    public utilisateurId?: number
  ) {}
}
