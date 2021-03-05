import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms'
import {AuthService} from '../auth.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  title = "Register";
  signUpForm:FormGroup;
  firstName:String="";
  lastName:String="";
  email:String="";
  defaultName:String="";
  password:String="";
  meetings:{}={}
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService) {
    this.signUpForm = formBuilder.group({
      firstname:new FormControl('',Validators.required),
      lastname:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      defaultname:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      meetings:new FormControl()
    })
   }

  ngOnInit(): void {
    this.authService.getNews().subscribe((data)=>{
      console.log(data)
    })
  }

  PostData(signUpForm){
    console.log(signUpForm.controls)
  }

}
