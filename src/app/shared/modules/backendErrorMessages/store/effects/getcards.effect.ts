import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from "@angular/router";
import { getCardsAction, getCardsSuccessAction, getCardsFailureAction } from "../actions/getcards.actions";
import { ApiService } from "src/app/shared/services/api.service";
import { CardInterface } from "src/app/shared/types/card.interface";
import { CardResponseInterface } from "src/app/shared/types/cardResponse.interface";

@Injectable()
export class GetCardEffect {
  getcards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCardsAction),
      switchMap(({ request }) => {

        return this.apiService.getcards(request).pipe(
          map((data: CardResponseInterface) => {
            return getCardsSuccessAction({ data: data.data as CardInterface[] });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error);
            return of(getCardsFailureAction({ errors: errorResponse.error.errors }));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCardsSuccessAction),
      tap(() => {
        //this.router.navigateByUrl("/page");
        console.log("getCardsSuccessAction");
      })
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private apiService: ApiService, private router: Router) {}
}
