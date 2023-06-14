import { CommonModule } from "@angular/common";
import { Input, NgModule } from "@angular/core";
import { BackendErrorMessagesComponent } from "src/app/shared/modules/backendErrorMessages/components/backendErrorMessages/backendErrorMessages.component";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

@NgModule({
    imports: [CommonModule],
    declarations: [BackendErrorMessagesComponent],
    exports: [BackendErrorMessagesComponent]
})
export class BackednErrorMessagesModule{
}