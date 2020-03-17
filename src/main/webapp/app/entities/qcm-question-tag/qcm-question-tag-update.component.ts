import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQcmQuestionTag, QcmQuestionTag } from 'app/shared/model/qcm-question-tag.model';
import { QcmQuestionTagService } from './qcm-question-tag.service';

@Component({
  selector: 'jhi-qcm-question-tag-update',
  templateUrl: './qcm-question-tag-update.component.html'
})
export class QcmQuestionTagUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected qcmQuestionTagService: QcmQuestionTagService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ qcmQuestionTag }) => {
      this.updateForm(qcmQuestionTag);
    });
  }

  updateForm(qcmQuestionTag: IQcmQuestionTag): void {
    this.editForm.patchValue({
      id: qcmQuestionTag.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const qcmQuestionTag = this.createFromForm();
    if (qcmQuestionTag.id !== undefined) {
      this.subscribeToSaveResponse(this.qcmQuestionTagService.update(qcmQuestionTag));
    } else {
      this.subscribeToSaveResponse(this.qcmQuestionTagService.create(qcmQuestionTag));
    }
  }

  private createFromForm(): IQcmQuestionTag {
    return {
      ...new QcmQuestionTag(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQcmQuestionTag>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
