import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalingService {
  private url = environment.SOCKET_ENDPOINT;
  private socket;

  constructor() {
    this.socket = io(this.url);
  }
}
