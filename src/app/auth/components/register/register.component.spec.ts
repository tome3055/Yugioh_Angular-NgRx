import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { registerAction } from 'src/app/auth/store/actions/register.action';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
      ],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
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

  it('should dispatch register action on form submission', () => {
    component.initializeForms();
    component.form.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password'
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(registerAction({ request: { user: component.form.value } }));
  });
});
