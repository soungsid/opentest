import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQcmTestResponse } from 'app/shared/model/qcm-test-response.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { QcmTestResponseService } from './qcm-test-response.service';
import { QcmTestResponseDeleteDialogComponent } from './qcm-test-response-delete-dialog.component';

@Component({
  selector: 'jhi-qcm-test-response',
  templateUrl: './qcm-test-response.component.html'
})
export class QcmTestResponseComponent implements OnInit, OnDestroy {
  qcmTestResponses: IQcmTestResponse[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected qcmTestResponseService: QcmTestResponseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.qcmTestResponses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.qcmTestResponseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IQcmTestResponse[]>) => this.paginateQcmTestResponses(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.qcmTestResponses = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQcmTestResponses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQcmTestResponse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQcmTestResponses(): void {
    this.eventSubscriber = this.eventManager.subscribe('qcmTestResponseListModification', () => this.reset());
  }

  delete(qcmTestResponse: IQcmTestResponse): void {
    const modalRef = this.modalService.open(QcmTestResponseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.qcmTestResponse = qcmTestResponse;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateQcmTestResponses(data: IQcmTestResponse[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.qcmTestResponses.push(data[i]);
      }
    }
  }
}
