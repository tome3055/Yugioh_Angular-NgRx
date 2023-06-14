import { Injectable } from "@angular/core";

@Injectable()
export class PersistanceService {
    set(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.log("error saving to local storage", e);
        }
    }

    get(key: string): any {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : null;
        } catch (e) {
            console.log("error getting data from local storage", e);
            return null;
        }
    }
}
