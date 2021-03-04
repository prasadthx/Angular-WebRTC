import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    // @ts-ignore
    this.socket = io(this.url);
  }
}
