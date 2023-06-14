import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CardResponseInterface } from "src/app/shared/types/cardResponse.interface";


export const cardsFeatureSelector = createFeatureSelector<CardResponseInterface>("cards");

export const cardsSelector = createSelector(cardsFeatureSelector, (cardResponse: CardResponseInterface) => cardResponse.data);
