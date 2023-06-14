import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { registerAction } from "src/app/auth/store/actions/register.action";
import { RegisterRequestInterface } from "src/app/auth/types/registerRequest.interface";
import { isSubmittingSelector, validationErrorsSelector } from "src/app/auth/store/selectors";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

@Component({
    selector: "yu-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit{
    form: FormGroup = new FormGroup({});
    isSubmitting$: Observable<boolean> = new Observable<boolean>();
    backendErrors$!: Observable<BackendErrorsInterface | null>;

    constructor(private fb: FormBuilder, private store: Store) {
        
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
        const request: RegisterRequestInterface = {
            user: this.form.value
        };
        this.store.dispatch(registerAction({request}));
    }
}