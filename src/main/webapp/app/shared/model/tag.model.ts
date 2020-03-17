export interface ITag {
  id?: number;
  libelle?: string;
  code?: string;
  qcmQuestionTagId?: number;
}

export class Tag implements ITag {
  constructor(public id?: number, public libelle?: string, public code?: string, public qcmQuestionTagId?: number) {}
}
