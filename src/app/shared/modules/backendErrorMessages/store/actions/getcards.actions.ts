import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/auth/store/actionTypes";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { CardInterface } from "src/app/shared/types/card.interface";
import { CardRequestInterface } from "src/app/shared/types/cardRequest.interface";
import { CardResponseInterface } from "src/app/shared/types/cardResponse.interface";


export const getCardsAction = createAction(
    ActionTypes.GET_CARDS,
    props<{ request: CardRequestInterface }>()
);

export const getCardsSuccessAction = createAction(
    ActionTypes.GET_CARDS_SUCCESS,
    props<{ data: CardInterface[]}>()
);

export const getCardsFailureAction = createAction(
    ActionTypes.GET_CARDS_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
);

