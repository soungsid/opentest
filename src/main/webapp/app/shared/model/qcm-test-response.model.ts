import { Moment } from 'moment';
import { IQcmTest } from 'app/shared/model/qcm-test.model';
import { IQcmQuestion } from 'app/shared/model/qcm-question.model';
import { IQcmReponse } from 'app/shared/model/qcm-reponse.model';

export interface IQcmTestResponse {
  id?: number;
  dateSoumission?: Moment;
  idQcmTests?: IQcmTest[];
  idQcmQuestions?: IQcmQuestion[];
  idQcmReponses?: IQcmReponse[];
}

export class QcmTestResponse implements IQcmTestResponse {
  constructor(
    public id?: number,
    public dateSoumission?: Moment,
    public idQcmTests?: IQcmTest[],
    public idQcmQuestions?: IQcmQuestion[],
    public idQcmReponses?: IQcmReponse[]
  ) {}
}
