import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { enviroment } from 'src/enviroment/enviroment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('register', () => {
    it('should send a POST request to register endpoint and return user data',
      inject([AuthService], (service: AuthService) => {
        const registerData: RegisterRequestInterface = {     user: {
            username: "test",
            password: "test",
            email: "test"
        }};
        const expectedUser: CurrentUserInterface = {
            id: '123',
            email: "",
            createdAt: "createdat",
            updatedAt: "updatedat",
            username: "test",
            bio: null,
            image: null,
            token: 'abcd1234'
        };

        service.register(registerData).subscribe((user: CurrentUserInterface) => {
          expect(user).toEqual(expectedUser);
        });

        const req = httpMock.expectOne('http://your-api-url/register');
        expect(req.request.method).toBe('POST');
        req.flush({ user: expectedUser } as AuthResponseInterface);
      })
    );
  });

  describe('login', () => {
    it('should send a POST request to login endpoint and return user data',
      inject([AuthService], (service: AuthService) => {
        const loginData: LoginRequestInterface = { user: { username: "test", password: "test"} };
        const expectedUser: CurrentUserInterface = {
              id: '123',
              email: "",
              createdAt: "createdat",
              updatedAt: "updatedat",
              username: "test",
              bio: null,
              image: null,
              token: 'abcd1234'
          };

        service.login(loginData).subscribe((user: CurrentUserInterface) => {
          expect(user).toEqual(expectedUser);
        });

        const req = httpMock.expectOne(enviroment.apiUrl + '/login');
        expect(req.request.method).toBe('POST');
        req.flush({ user: expectedUser } as AuthResponseInterface);
      })
    );
  });
});
