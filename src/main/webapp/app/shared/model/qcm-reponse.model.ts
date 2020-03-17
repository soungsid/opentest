import { IQcmQuestion } from 'app/shared/model/qcm-question.model';

export interface IQcmReponse {
  id?: number;
  reponseText?: string;
  reponseImageContentType?: string;
  reponseImage?: any;
  reponseNombre?: number;
  correct?: boolean;
  poids?: number;
  idQcmQuestions?: IQcmQuestion[];
  qcmTestResponseId?: number;
}

export class QcmReponse implements IQcmReponse {
  constructor(
    public id?: number,
    public reponseText?: string,
    public reponseImageContentType?: string,
    public reponseImage?: any,
    public reponseNombre?: number,
    public correct?: boolean,
    public poids?: number,
    public idQcmQuestions?: IQcmQuestion[],
    public qcmTestResponseId?: number
  ) {
    this.correct = this.correct || false;
  }
}
