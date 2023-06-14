import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { loginAction } from 'src/app/auth/store/actions/login.action';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.initializeForms();
    expect(component.form).toBeDefined();
    expect(component.form.get('username')).toBeDefined();
    expect(component.form.get('email')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });

  it('should initialize the values correctly', () => {
    spyOn(store, 'pipe').and.returnValue(of(true));
    component.initializeValues();
    expect(component.isSubmitting$).toBeDefined();
    expect(component.backendErrors$).toBeDefined();
  });

  it('should dispatch login action on form submission', () => {
    component.initializeForms();
    component.form.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password'
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(loginAction({ request: { user: component.form.value } }));
  });

  it('should navigate to a different route after successful login', () => {
    spyOn(store, 'pipe').and.returnValue(of(false));
    component.initializeForms();
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/page']);
  });
});
