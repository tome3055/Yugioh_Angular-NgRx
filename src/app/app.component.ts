import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './auth/services/authguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'yugioh';
  private readonly AUTH_STORAGE_KEY = 'isLoggedIn';

  loggedIn: Boolean | null = false;

  constructor (private authGuard: AuthGuard, private router: Router){}
  ngOnInit(): void {
    this.loggedIn = this.authGuard.canActivate();
  }

  logout(): void {
    this.loggedIn = false;
    this.storeAuthStatus(false);    
    this.router.navigate(['/login']);
  }

  private storeAuthStatus(status: boolean | null): void {
    localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(status));
  }
}
