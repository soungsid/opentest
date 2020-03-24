import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQcmTest } from 'app/shared/model/qcm-test.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { QcmTestService } from './qcm-test.service';
import { QcmTestDeleteDialogComponent } from './qcm-test-delete-dialog.component';

@Component({
  selector: 'jhi-qcm-test',
  templateUrl: './qcm-test.component.html'
})
export class QcmTestComponent implements OnInit, OnDestroy {
  qcmTests: IQcmTest[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected qcmTestService: QcmTestService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.qcmTests = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.qcmTestService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IQcmTest[]>) => this.paginateQcmTests(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.qcmTests = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQcmTests();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQcmTest): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQcmTests(): void {
    this.eventSubscriber = this.eventManager.subscribe('qcmTestListModification', () => this.reset());
  }

  delete(qcmTest: IQcmTest): void {
    const modalRef = this.modalService.open(QcmTestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.qcmTest = qcmTest;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateQcmTests(data: IQcmTest[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.qcmTests.push(data[i]);
      }
    }
  }
}
