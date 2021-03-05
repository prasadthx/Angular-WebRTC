import { Injectable } from '@angular/core';
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SignalingService {
  private url = 'http://localhost:4000';
  private socket;

  constructor() {
    // @ts-ignore
    this.socket = io(this.url);
  }
}

