import { Moment } from 'moment';
import { IQcm } from 'app/shared/model/qcm.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IQcmTest {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  email?: string;
  score?: number;
  highScore?: number;
  idQcms?: IQcm[];
  idUtilisateurs?: IUtilisateur[];
  qcmTestResponseId?: number;
}

export class QcmTest implements IQcmTest {
  constructor(
    public id?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public email?: string,
    public score?: number,
    public highScore?: number,
    public idQcms?: IQcm[],
    public idUtilisateurs?: IUtilisateur[],
    public qcmTestResponseId?: number
  ) {}
}
