import {Inject, Injectable} from '@angular/core';
import { io } from 'socket.io-client';
import { DOCUMENT } from '@angular/common';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {
  private url = 'http://localhost:5000';
  public socket;

  constructor() {
    // @ts-ignore
    this.socket = io(this.url);
  }

  public roomJoin(roomName){
    this.socket.emit('join', roomName);
  }

  public getRoomCreatedStatus(){
    return new Observable ((observer: Observer<any>) => {
        this.socket.on('joined', (roomStatus) => {
          observer.next(roomStatus);
        });
    });
  };

  public onPeerReady(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('ready', () => {
         observer.next('Peer ready');
      });
    });
  };

  public onCandidate(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('candidate', (candidate) => {
        observer.next(candidate);
      });
    });
  };

  public onReceiveOffer(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('offer', (offer) => {
        observer.next(offer);
      });
    });
  };

  public onAnswer(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('answer', (answer) => {
        observer.next(answer);
      });
    });
  }
}
