import { IQcm } from 'app/shared/model/qcm.model';
import { TypeQuestion } from 'app/shared/model/enumerations/type-question.model';

export interface IQcmQuestion {
  id?: number;
  libelle?: string;
  type?: TypeQuestion;
  explication?: any;
  idQcms?: IQcm[];
  qcmQuestionTagId?: number;
  qcmReponseId?: number;
  qcmTestResponseId?: number;
}

export class QcmQuestion implements IQcmQuestion {
  constructor(
    public id?: number,
    public libelle?: string,
    public type?: TypeQuestion,
    public explication?: any,
    public idQcms?: IQcm[],
    public qcmQuestionTagId?: number,
    public qcmReponseId?: number,
    public qcmTestResponseId?: number
  ) {}
}
