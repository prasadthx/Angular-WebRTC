import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from "../../services/account.service";
declare var VANTA;


@Component({ templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.css']}
)
export class LayoutComponent implements OnInit{
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }

  ngOnInit(): void {

  }
}
