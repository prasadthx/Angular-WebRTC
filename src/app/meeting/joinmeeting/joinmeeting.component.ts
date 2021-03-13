import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../auth/services/account.service'
import { AlertService } from '../../auth/services/alert.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joinmeeting',
  templateUrl: './joinmeeting.component.html',
  styleUrls: ['./joinmeeting.component.css']
})
export class JoinmeetingComponent implements OnInit {
  account = this.accountService.accountValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;
  meeting={}

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          description: ['', [Validators.required]]
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
      
      this.meeting['description'] = this.form.value['description']
      this.loading = true;
        this.accountService.createmeeting(this.account.id, this.meeting)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.toastr.success("Meeting Created Successfully","Success")
                    this.router.navigate(['/auth'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.toastr.error(error)
                    this.loading = false;
                }
            });
      
  }
}
