import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AccountService } from '../services/account.service';

@Component({ templateUrl: 'home.component.html',
styleUrls:['home.component.css'] })
export class HomeComponent{
    account = this.accountService.accountValue;
    meetings: any;
    
    constructor(private accountService: AccountService,private route: ActivatedRoute) { 
        
        // this.accountService.getmeetings(this.account.id).subscribe(data=>{
        //     this.meetings = data
        //     console.log(data)
        //     console.log(this.meetings)
        //     // console.log((JSON.parse(this.meetings)))
        // })
        // console.log(this.account.meetings)
        this.meetings = this.route.snapshot.data.userdata;   
        console.log(this.meetings)
        
    }


    ngOnInit() {  
       for (const key in this.meetings) {
           console.log(key)
       }
    }  

    logout(){
        this.accountService.logout();
    }
}
