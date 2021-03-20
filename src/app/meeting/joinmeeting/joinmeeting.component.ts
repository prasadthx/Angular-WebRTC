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
          meetcode: ['', [Validators.required]],
          username: ['', [Validators.required]]
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
      this.router.navigate(['/meeting/room'],{queryParams:{code:this.form.value['meetcode'], username:this.form.value['username']}})
  }
}
