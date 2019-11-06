import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { ICategorie } from 'app/shared/model/categorie.model';

export interface IQcm {
  id?: number;
  name?: string;
  nbQuestion?: number;
  privee?: boolean;
  createBies?: IUtilisateur[];
  idCategories?: ICategorie[];
  qcmQuestionId?: number;
  qcmTestId?: number;
}

export class Qcm implements IQcm {
  constructor(
    public id?: number,
    public name?: string,
    public nbQuestion?: number,
    public privee?: boolean,
    public createBies?: IUtilisateur[],
    public idCategories?: ICategorie[],
    public qcmQuestionId?: number,
    public qcmTestId?: number
  ) {
    this.privee = this.privee || false;
  }
}
