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

  public roomJoin(roomName, userName){
    this.socket.emit('join', roomName, userName);
  }

  public joinAsHost(roomName){
    this.socket.emit('joinAsHost', roomName);
  }

  public getRoomCreatedStatus(){
    return new Observable ((observer: Observer<any>) => {
        this.socket.on('acceptRejectCall', (userName) => {
          observer.next(userName);
        });
    });
  }

  public callCancelled(){
    return new Observable ( (observer: Observer<any>) => {
      this.socket.on('callCancelled', () => {
        observer.next('Call Cancelled');
      });
    });
  }

  public onPeerReady(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('ready', (roomName, socketId) => {
        const object = [roomName, socketId];
        observer.next(object);
      });
    });
  }

  public onCandidate(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('candidate', (candidate) => {
        observer.next(candidate);
      });
    });
  }

  public onReceiveOffer(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('offer', (offer, socketId) => {
        const paramsList = [offer, socketId]
        observer.next(paramsList);
      });
    });
  }

  public onAnswer(){
    return new Observable( (observer: Observer<any>) => {
      this.socket.on('answer', (answer) => {
        observer.next(answer);
      });
    });
  }
}
