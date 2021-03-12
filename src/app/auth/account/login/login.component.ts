import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
declare var VANTA;
import { AccountService } from '../../services/account.service';
import {AlertService} from "../../services/alert.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl:String;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private toastr: ToastrService
    ) {
          
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.route.queryParams
      .subscribe(params => {
        if(params.registered !== undefined && params.registered === 'true') {
            this.toastr.success("Check your mailbox for verifying your EmailId","Verification Email Sent")
        }
        if(params.verified !== undefined && params.verified === 'true') {
            this.toastr.success("Proceed to Login","Email Verification Complete")
        }

        this.route.queryParams
        .subscribe(params => this.returnUrl = params['returnUrl'] || '/');

        console.log(this.returnUrl)
      })
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
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    this.router.navigate([this.returnUrl])
                    this.toastr.success("Logged In Successfully")
                },
                error: error => {
                    this.toastr.error(error);
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
