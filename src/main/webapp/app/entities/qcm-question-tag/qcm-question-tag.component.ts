import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQcmQuestionTag } from 'app/shared/model/qcm-question-tag.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { QcmQuestionTagService } from './qcm-question-tag.service';
import { QcmQuestionTagDeleteDialogComponent } from './qcm-question-tag-delete-dialog.component';

@Component({
  selector: 'jhi-qcm-question-tag',
  templateUrl: './qcm-question-tag.component.html'
})
export class QcmQuestionTagComponent implements OnInit, OnDestroy {
  qcmQuestionTags: IQcmQuestionTag[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected qcmQuestionTagService: QcmQuestionTagService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.qcmQuestionTags = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.qcmQuestionTagService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IQcmQuestionTag[]>) => this.paginateQcmQuestionTags(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.qcmQuestionTags = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQcmQuestionTags();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQcmQuestionTag): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQcmQuestionTags(): void {
    this.eventSubscriber = this.eventManager.subscribe('qcmQuestionTagListModification', () => this.reset());
  }

  delete(qcmQuestionTag: IQcmQuestionTag): void {
    const modalRef = this.modalService.open(QcmQuestionTagDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.qcmQuestionTag = qcmQuestionTag;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateQcmQuestionTags(data: IQcmQuestionTag[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.qcmQuestionTags.push(data[i]);
      }
    }
  }
}
