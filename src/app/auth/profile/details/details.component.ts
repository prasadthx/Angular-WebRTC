import { Component } from '@angular/core';
import {AccountService} from "../../services/account.service";



@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService) { }
}
