import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isLoggedIn } from 'src/app/auth/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  constructor(private store: Store) {}

  getIsLoggedIn$() {
    return this.store.select(isLoggedIn);
  }
}