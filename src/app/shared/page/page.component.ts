import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthGuard } from "src/app/auth/services/authguard.service";
import { getCardsAction } from "src/app/shared/modules/backendErrorMessages/store/actions/getcards.actions";
import { cardsSelector } from "src/app/shared/modules/backendErrorMessages/store/selectors";
import { CardInterface } from "src/app/shared/types/card.interface";
import { CardResponseInterface } from "src/app/shared/types/cardResponse.interface";
import { CardRequestInterface } from "src/app/shared/types/cardRequest.interface";

@Component({
  selector: "yu-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"]
})
export class PageComponent implements OnInit {
  @Input("CardResponse") cardResponse!: CardResponseInterface;
  cards!: CardInterface[];

  cardrequest: CardRequestInterface = {
    data: "request"
  }

  constructor(private authGuard: AuthGuard, private store: Store) {}

  ngOnInit(): void {
    if (this.authGuard.canActivate()) {
      this.initializeValues();
    }
  }

  initializeValues() {
    this.store.dispatch(getCardsAction({ request: this.cardrequest }));
    this.store.select(cardsSelector).subscribe((data: CardInterface[]) => {
      this.cards = data;
      this.cardResponse = {
        data: this.cards.map((card) => {
          return { ...card };
        })
      };
    });
  }
}