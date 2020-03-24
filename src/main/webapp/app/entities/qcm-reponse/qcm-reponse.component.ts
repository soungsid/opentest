import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQcmReponse } from 'app/shared/model/qcm-reponse.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { QcmReponseService } from './qcm-reponse.service';
import { QcmReponseDeleteDialogComponent } from './qcm-reponse-delete-dialog.component';

@Component({
  selector: 'jhi-qcm-reponse',
  templateUrl: './qcm-reponse.component.html'
})
export class QcmReponseComponent implements OnInit, OnDestroy {
  qcmReponses: IQcmReponse[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected qcmReponseService: QcmReponseService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.qcmReponses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.qcmReponseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IQcmReponse[]>) => this.paginateQcmReponses(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.qcmReponses = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQcmReponses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQcmReponse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInQcmReponses(): void {
    this.eventSubscriber = this.eventManager.subscribe('qcmReponseListModification', () => this.reset());
  }

  delete(qcmReponse: IQcmReponse): void {
    const modalRef = this.modalService.open(QcmReponseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.qcmReponse = qcmReponse;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateQcmReponses(data: IQcmReponse[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.qcmReponses.push(data[i]);
      }
    }
  }
}
