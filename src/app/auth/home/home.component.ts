import { Component } from '@angular/core';

import { AccountService } from '../services/account.service';

@Component({ templateUrl: 'home.component.html',
styleUrls:['home.component.css'] })
export class HomeComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService) { }

    logout(){
        this.accountService.logout();
    }
}
