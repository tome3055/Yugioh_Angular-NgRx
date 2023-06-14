import { Action, createReducer, on } from "@ngrx/store";

import { CardResponseInterface } from "src/app/shared/types/cardResponse.interface";
import { getCardsSuccessAction } from "./actions/getcards.actions";

const initialState: CardResponseInterface = {
    data: []
};

const cardsReducer = createReducer(
    initialState,
    on(getCardsSuccessAction,
      (state, action): CardResponseInterface => ({
      ...state,
      data: action.data
    })),
);

export function cards(state: CardResponseInterface, action: Action){
    return cardsReducer(state, action);
};