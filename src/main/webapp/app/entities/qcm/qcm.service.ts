import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQcm } from 'app/shared/model/qcm.model';

type EntityResponseType = HttpResponse<IQcm>;
type EntityArrayResponseType = HttpResponse<IQcm[]>;

@Injectable({ providedIn: 'root' })
export class QcmService {
  public resourceUrl = SERVER_API_URL + 'api/qcms';

  constructor(protected http: HttpClient) {}

  create(qcm: IQcm): Observable<EntityResponseType> {
    return this.http.post<IQcm>(this.resourceUrl, qcm, { observe: 'response' });
  }

  update(qcm: IQcm): Observable<EntityResponseType> {
    return this.http.put<IQcm>(this.resourceUrl, qcm, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQcm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQcm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
