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
    VANTA.NET({
      el: "#your-element-selector",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x3fc8ff
    })
  }
}
