import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarnetAdresse } from 'app/shared/model/carnet-adresse.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CarnetAdresseService } from './carnet-adresse.service';
import { CarnetAdresseDeleteDialogComponent } from './carnet-adresse-delete-dialog.component';

@Component({
  selector: 'jhi-carnet-adresse',
  templateUrl: './carnet-adresse.component.html'
})
export class CarnetAdresseComponent implements OnInit, OnDestroy {
  carnetAdresses: ICarnetAdresse[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected carnetAdresseService: CarnetAdresseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.carnetAdresses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.carnetAdresseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICarnetAdresse[]>) => this.paginateCarnetAdresses(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.carnetAdresses = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarnetAdresses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarnetAdresse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarnetAdresses(): void {
    this.eventSubscriber = this.eventManager.subscribe('carnetAdresseListModification', () => this.reset());
  }

  delete(carnetAdresse: ICarnetAdresse): void {
    const modalRef = this.modalService.open(CarnetAdresseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carnetAdresse = carnetAdresse;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCarnetAdresses(data: ICarnetAdresse[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.carnetAdresses.push(data[i]);
      }
    }
  }
}
