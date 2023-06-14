import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

import { enviroment } from "src/enviroment/enviroment";
import { CardResponseInterface } from "src/app/shared/types/cardResponse.interface";
import { CardInterface } from "src/app/shared/types/card.interface";
import { CardRequestInterface } from "src/app/shared/types/cardRequest.interface";

@Injectable()
export class ApiService {
    
    constructor(private http: HttpClient) { }

    getcards(data: CardRequestInterface): Observable<CardResponseInterface>{
        const url = enviroment.apiUrl + "/cards";
        return this.http
            .post<CardResponseInterface>(url, data)
            .pipe(map((response: CardResponseInterface) => response));
    }
};