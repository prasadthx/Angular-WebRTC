import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  APIURL = "localhost:8080";

  constructor(private httpClient: HttpClient,public router: Router){}

  public getNews(){
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/todos`);
  }

  public registerUser(user){
    return this.httpClient.get(this.APIURL, user)
  }

  public loginUser(data){
    return this.httpClient.get(this.APIURL, data)
  }

  public forgotPassword(){

  }

  public editUser(){

  }

  public verifyEmail(){

  }

  public deleteUser(){

  }

  public createMeeting(){

  }

}