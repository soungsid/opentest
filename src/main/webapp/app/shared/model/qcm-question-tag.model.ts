import { IQcmQuestion } from 'app/shared/model/qcm-question.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IQcmQuestionTag {
  id?: number;
  idQcmQuestions?: IQcmQuestion[];
  idTags?: ITag[];
}

export class QcmQuestionTag implements IQcmQuestionTag {
  constructor(public id?: number, public idQcmQuestions?: IQcmQuestion[], public idTags?: ITag[]) {}
}
