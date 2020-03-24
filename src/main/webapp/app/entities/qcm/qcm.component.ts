import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQcm } from 'app/shared/model/qcm.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { QcmService } from './qcm.service';
import { QcmDeleteDialogComponent } from './qcm-delete-dialog.component';

@Component({
  selector: 'jhi-qcm',
  templateUrl: './qcm.component.html'
})
export class QcmComponent implements OnInit, OnDestroy {
  qcms: IQcm[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected qcmService: QcmService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.qcms = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.qcmService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IQcm[]>) => this.paginateQcms(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.qcms = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQcms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQcm): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQcms(): void {
    this.eventSubscriber = this.eventManager.subscribe('qcmListModification', () => this.reset());
  }

  delete(qcm: IQcm): void {
    const modalRef = this.modalService.open(QcmDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.qcm = qcm;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateQcms(data: IQcm[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.qcms.push(data[i]);
      }
    }
  }
}
