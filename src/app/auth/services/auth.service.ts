import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Store, select } from '@ngrx/store';

import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { RegisterRequestInterface } from "src/app/auth/types/registerRequest.interface";
import { enviroment } from "src/enviroment/enviroment";
import { AuthResponseInterface } from "src/app/auth/types/authResponse.interface";
import { LoginRequestInterface } from "src/app/auth/types/loginRequest.interface";

@Injectable()
export class AuthService {
    
    constructor(private http: HttpClient) { }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface>{
        const url = enviroment.apiUrl + "/register";
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map((response: AuthResponseInterface) => response.user));
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
        const url = enviroment.apiUrl + "/login";
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map((response: AuthResponseInterface) => response.user));
    }
};