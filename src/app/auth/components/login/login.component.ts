import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { isSubmittingSelector, validationErrorsSelector } from "src/app/auth/store/selectors";
import { LoginRequestInterface } from "src/app/auth/types/loginRequest.interface";
import { loginAction } from "src/app/auth/store/actions/login.action";
import { Router } from "@angular/router";

@Component({
    selector: "yu-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
    form: FormGroup = new FormGroup({});
    isSubmitting$: Observable<boolean> = new Observable<boolean>();
    backendErrors$!: Observable<BackendErrorsInterface | null>;

    constructor(private fb: FormBuilder, private store: Store,private router: Router) {
        
    }
    ngOnInit(): void {
        this.initializeForms();
        this.initializeValues();
    }

    initializeForms(): void
    {
        this.form = this.fb.group({
            username: ["", Validators.required],
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    initializeValues(): void
    {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    onSubmit(): void
    {
        const request: LoginRequestInterface = {
            user: this.form.value
        }; 
        this.store.dispatch(loginAction({request}));   
    }
}