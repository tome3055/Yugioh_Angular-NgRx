import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './authguard.service';
import { Router } from '@angular/router';
import { SharedUserService } from 'src/app/shared/services/shareduserdata.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let sharedUserService: SharedUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, SharedUserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    sharedUserService = TestBed.inject(SharedUserService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true and allow navigation if the user is logged in', () => {
      spyOn(router, 'navigate');
      authGuard['isloggedin'] = true;

      const result = authGuard.canActivate();

      expect(result).toBeTrue();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should return false and navigate to login page if the user is not logged in', () => {
      spyOn(router, 'navigate');
      authGuard['isloggedin'] = false;

      const result = authGuard.canActivate();

      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('getStoredAuthStatus', () => {
    it('should return stored authentication status if available', () => {
      const storedStatus = true;
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedStatus));

      const result = authGuard['getStoredAuthStatus']();

      expect(result).toBe(storedStatus);
      expect(localStorage.getItem).toHaveBeenCalledWith('isLoggedIn');
    });

    it('should return null if no stored authentication status is available', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const result = authGuard['getStoredAuthStatus']();

      expect(result).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith('isLoggedIn');
    });
  });

  describe('storeAuthStatus', () => {
    it('should store the authentication status in localStorage', () => {
      const status = true;
      spyOn(localStorage, 'setItem');

      authGuard['storeAuthStatus'](status);

      expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', JSON.stringify(status));
    });
  });

  describe('sharedUserService subscription', () => {
    it('should update isloggedin and store the authentication status when sharedUserService emits a new value', () => {
      const status = true;
      spyOn(authGuard, 'storeAuthStatus');

      sharedUserService.getIsLoggedIn$().next(status);

      expect(authGuard['isloggedin']).toBe(status);
      expect(authGuard.storeAuthStatus).toHaveBeenCalledWith(status);
    });

    it('should not update isloggedin and store the authentication status if sharedUserService emits null', () => {
      spyOn(authGuard, 'storeAuthStatus');

      sharedUserService.getIsLoggedIn$().next(null);

      expect(authGuard['isloggedin']).toBeNull();
      expect(authGuard.storeAuthStatus).not.toHaveBeenCalled();
    });
  });
});
