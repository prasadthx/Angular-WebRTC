import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import {AccountService} from "../../services/account.service";
import {AlertService} from "../../services/alert.service";
import { ToastrService } from 'ngx-toastr';


@Component({ templateUrl: 'forgot-password.component.html' })
export class ForgotPasswordComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private alertService: AlertService,
        private toaster: ToastrService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.alertService.clear();
        this.accountService.forgotPassword(this.f.email.value)
            .pipe(first())
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: () => {
                    this.alertService.success('Please check your email for password reset instructions');
                    this.toaster.success("Email sent to reset your password","Email Sent")
                },
                error: error => {
                    this.alertService.error(error)
                    this.toaster.error(error)
                }
            });
    }
}

