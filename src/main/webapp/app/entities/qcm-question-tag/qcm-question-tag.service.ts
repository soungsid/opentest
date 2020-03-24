import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQcmQuestionTag } from 'app/shared/model/qcm-question-tag.model';

type EntityResponseType = HttpResponse<IQcmQuestionTag>;
type EntityArrayResponseType = HttpResponse<IQcmQuestionTag[]>;

@Injectable({ providedIn: 'root' })
export class QcmQuestionTagService {
  public resourceUrl = SERVER_API_URL + 'api/qcm-question-tags';

  constructor(protected http: HttpClient) {}

  create(qcmQuestionTag: IQcmQuestionTag): Observable<EntityResponseType> {
    return this.http.post<IQcmQuestionTag>(this.resourceUrl, qcmQuestionTag, { observe: 'response' });
  }

  update(qcmQuestionTag: IQcmQuestionTag): Observable<EntityResponseType> {
    return this.http.put<IQcmQuestionTag>(this.resourceUrl, qcmQuestionTag, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQcmQuestionTag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQcmQuestionTag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
