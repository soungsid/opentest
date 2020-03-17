import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQcmQuestion } from 'app/shared/model/qcm-question.model';

type EntityResponseType = HttpResponse<IQcmQuestion>;
type EntityArrayResponseType = HttpResponse<IQcmQuestion[]>;

@Injectable({ providedIn: 'root' })
export class QcmQuestionService {
  public resourceUrl = SERVER_API_URL + 'api/qcm-questions';

  constructor(protected http: HttpClient) {}

  create(qcmQuestion: IQcmQuestion): Observable<EntityResponseType> {
    return this.http.post<IQcmQuestion>(this.resourceUrl, qcmQuestion, { observe: 'response' });
  }

  update(qcmQuestion: IQcmQuestion): Observable<EntityResponseType> {
    return this.http.put<IQcmQuestion>(this.resourceUrl, qcmQuestion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQcmQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQcmQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
