import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedUserService } from 'src/app/shared/services/shareduserdata.service';

@Injectable()
export class AuthGuard {
  private readonly AUTH_STORAGE_KEY = 'isLoggedIn';
  private isloggedin: boolean | null;

  constructor(private router: Router, private sharedUserService: SharedUserService) {
    this.isloggedin = this.getStoredAuthStatus();
    this.sharedUserService.getIsLoggedIn$().subscribe(data => {
      if (data !== null)
      {
        this.isloggedin = data;
        this.storeAuthStatus(data);
      }
    });
  }

  canActivate(): boolean {
    if (this.isloggedin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private getStoredAuthStatus(): boolean | null {
    const storedStatus = localStorage.getItem(this.AUTH_STORAGE_KEY);
    return storedStatus ? JSON.parse(storedStatus) : null;
  }

  private storeAuthStatus(status: boolean | null): void {
    localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(status));
  }
}