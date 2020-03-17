import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICarnetAdresse, CarnetAdresse } from 'app/shared/model/carnet-adresse.model';
import { CarnetAdresseService } from './carnet-adresse.service';

@Component({
  selector: 'jhi-carnet-adresse-update',
  templateUrl: './carnet-adresse-update.component.html'
})
export class CarnetAdresseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    lastname: [],
    firstname: [],
    email: []
  });

  constructor(protected carnetAdresseService: CarnetAdresseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carnetAdresse }) => {
      this.updateForm(carnetAdresse);
    });
  }

  updateForm(carnetAdresse: ICarnetAdresse): void {
    this.editForm.patchValue({
      id: carnetAdresse.id,
      lastname: carnetAdresse.lastname,
      firstname: carnetAdresse.firstname,
      email: carnetAdresse.email
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carnetAdresse = this.createFromForm();
    if (carnetAdresse.id !== undefined) {
      this.subscribeToSaveResponse(this.carnetAdresseService.update(carnetAdresse));
    } else {
      this.subscribeToSaveResponse(this.carnetAdresseService.create(carnetAdresse));
    }
  }

  private createFromForm(): ICarnetAdresse {
    return {
      ...new CarnetAdresse(),
      id: this.editForm.get(['id'])!.value,
      lastname: this.editForm.get(['lastname'])!.value,
      firstname: this.editForm.get(['firstname'])!.value,
      email: this.editForm.get(['email'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarnetAdresse>>): void {
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
