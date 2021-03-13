import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { AccountService } from './services/account.service';  
import { map } from 'rxjs/operators';
  
@Injectable({
    providedIn: 'root'
})  
export class GetMeetingResolve implements Resolve<Observable<any>>{  
  constructor(private accountService: AccountService) {}  
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){  
    return this.accountService.getmeetings(this.accountService.accountValue.id).pipe(
        map(userdata => userdata)
      )
    } 
}  