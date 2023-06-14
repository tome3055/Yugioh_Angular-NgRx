import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { inject } from '@angular/core';

import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { reducers } from "src/app/auth/store/reducers";
import { AuthService } from "src/app/auth/services/auth.service";
import { RegisterEffect } from "src/app/auth/store/effects/register.effect";
import { BackednErrorMessagesModule } from "src/app/shared/modules/backendErrorMessages/backendErrorMessages.module";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { LoginComponent } from "src/app/auth/components/login/login.component";
import { LoginEffect } from "src/app/auth/store/effects/login.effects";
import { AuthGuard } from 'src/app/auth/services/authguard.service';
import { PageComponent } from "src/app/shared/page/page.component";
import { SharedUserService } from "../shared/services/shareduserdata.service";
import { ApiService } from "../shared/services/api.service";
import { GetCardEffect } from "../shared/modules/backendErrorMessages/store/effects/getcards.effect";
import { cards } from "../shared/modules/backendErrorMessages/store/reducers";

const routes = [
    {
        path: "register",
        component: RegisterComponent
    },
    {        
        path: "login",
        component: LoginComponent
    },
    {
        path: 'page',
        component: PageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature("auth", reducers),
        StoreModule.forFeature("cards", cards),
        HttpClientModule,
        EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCardEffect]),
        BackednErrorMessagesModule
    ],
    declarations: [RegisterComponent, LoginComponent, PageComponent],
    providers: [AuthService, PersistanceService, AuthGuard, SharedUserService, ApiService]
})
export class AuthModule {}