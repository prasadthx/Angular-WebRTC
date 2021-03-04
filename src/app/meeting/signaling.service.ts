import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalingService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    // @ts-ignore
    this.socket = io(this.url);
  }
}
