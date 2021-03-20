import {AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {SignalingService} from './signaling.service';
import {ActivatedRoute, Router} from '@angular/router';
import { io } from 'socket.io-client';



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit, AfterViewInit {
  public socket;
  constructor(
        private signalingService: SignalingService,
        private route: ActivatedRoute,
        private router: Router) {
          console.log('In constructor');
          this.socket = io('http://localhost:5000');

          signalingService.getRoomCreatedStatus().subscribe((roomStatus) => {
      console.log('Room created: ' + roomStatus);
      this.displayStream();
      if (roomStatus === 'created'){
        this.creator = true;
        this.displayStream();
      }
      if (roomStatus === 'joined'){
        this.creator = false;
        this.displayStream();
        this.signalingService.socket.emit('ready', this.roomName);
      }
    });

  }

  @ViewChild('slide', {read: ElementRef}) slide: ElementRef;
  // @ViewChild('flexbox', {read:ElementRef}) flexbox:ElementRef
  @ViewChild('myRange', {read: ElementRef}) myrange: ElementRef;
  @ViewChild('headStyle', {read: ElementRef}) headstyle: ElementRef;
  @ViewChild('userVideo', {read: ElementRef}) userVideo: ElementRef;
  @ViewChild('peerVideo', { read: ElementRef}) peerVideo: ElementRef;

  peervideo;
  uservideo;
  flexBox;
  outerFlex;
  slider;
  headStyle;
  userstream;
  creator = false;
  roomName;
  rtcPeerConnection;
  // Contains the stun server URL we will be using.
  iceServers = {
    iceServers: [
      { urls: 'stun:stun.services.mozilla.com' },
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  };

  participants = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.code){
        this.roomName = params.code;
        console.log(params.code);
        this.signalingService.roomJoin(params.code);
      }
      if (params.username){
        console.log(params.username);
        // this.test.emitjoin(params.username);
      }
    });
    this.displayStream();

    this.signalingService.onPeerReady().subscribe( () => {
      console.log(this.userstream);
      this.peerConnection();
    });

  }


  ngAfterViewInit(): void {
    this.outerFlex = this.slide.nativeElement;
    console.log(this.outerFlex);
    // this.flexBox = this.flexbox.nativeElement
    this.flexBox = document.getElementsByClassName('flexbox');
    console.log(this.flexBox);

    console.log(this.flexBox);
    this.slider = this.myrange.nativeElement;
    console.log(this.slider);
    console.log(this.headstyle);
    this.headStyle = document.getElementsByClassName('style')[0];
    console.log(this.headStyle);
    // this.headStyle = this.headstyle.nativeElement
    // this.createGrid(this.participants);
    this.uservideo = this.userVideo.nativeElement;
    this.peervideo = this.peerVideo.nativeElement;



    this.signalingService.onCandidate().subscribe( (candidate) => {
      const icecandidate = new RTCIceCandidate(candidate);
      this.rtcPeerConnection.addIceCandidate(icecandidate);
    });

    this.signalingService.onReceiveOffer().subscribe((offer) => {
      console.log(this.userstream);
      this.onOffer(offer);
    });

    this.signalingService.onAnswer().subscribe( (answer) => {
      this.rtcPeerConnection.setRemoteDescription(answer);
    });
  }


  displayStream(){
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
      .then( (stream) => {
        /* use the stream */
        this.userstream = stream;
        this.uservideo.srcObject = stream;
        this.uservideo.onloadedmetadata = (e) => {
          this.uservideo.play();
        };
      })
      .catch( (err) => {
        /* handle the error */
        console.log(err);
        alert('Couldn\'t Access User Media');
      });
  }


  peerConnection(){
    if (this.creator) {
      this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
      console.log(this.signalingService.socket);
      this.rtcPeerConnection.onicecandidate = (event) => { if (event.candidate){this.signalingService.socket.emit('candidate', event.candidate, this.roomName); }};
      this.rtcPeerConnection.ontrack = (event) => { this.peervideo.srcObject = event.streams[0]; this.peervideo.onloadedmetadata = (e) => {this.peervideo.play(); }; };
      console.log(this.userstream);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[0], this.userstream);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[1], this.userstream);
      this.rtcPeerConnection
        .createOffer()
        .then((offer) => {
          this.rtcPeerConnection.setLocalDescription(offer);
          this.signalingService.socket.emit('offer', offer, this.roomName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onOffer(offer){
    if (!this.creator) {
      this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
      console.log(this.signalingService.socket);
      this.rtcPeerConnection.onicecandidate = (event) => { if (event.candidate){this.signalingService.socket.emit('candidate', event.candidate, this.roomName); }};
      this.rtcPeerConnection.ontrack = (event) => { this.peervideo.srcObject = event.streams[0]; this.peervideo.onloadedmetadata = (e) => {this.peervideo.play(); }; };
      console.log(this.userstream);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[0], this.userstream);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[1], this.userstream);
      this.rtcPeerConnection.setRemoteDescription(offer);
      this.rtcPeerConnection
        .createAnswer()
        .then((answer) => {
          this.rtcPeerConnection.setLocalDescription(answer);
          this.signalingService.socket.emit('answer', answer, this.roomName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Implementing the OnIceCandidateFunction which is part of the RTCPeerConnection Interface
  onIceCandidateFunction(event) {
    console.log('Candidate');
    console.log(this.signalingService.socket);
    if (event.candidate) {
      console.log(this.socket);
      this.signalingService.socket.emit('candidate', event.candidate, this.roomName);
    }
  }

  // Implementing the OnTrackFunction which is part of the RTCPeerConnection Interface.
  onTrackFunction(event) {
    this.peervideo.srcObject = event.streams[0];
    this.peervideo.onloadedmetadata = (e) => {
      this.peervideo.play();
    };
  }























  // checkOverflow(element) {
  //   return element.scrollHeight > element.offsetHeight || element.scrollWidth > element.clientWidth;
  // }

  // createGrid(number) {
  //   for (let i = 0; i <= number; i++){
  //     const currentFlexbox = this.flexBox[this.flexBox.length - 1];
  //     if (this.checkOverflow(currentFlexbox)){
  //       console.log('overflow');
  //       console.log(currentFlexbox.scrollHeight);
  //       console.log(currentFlexbox.offsetHeight);
  //       console.log(currentFlexbox.clientHeight);
  //       currentFlexbox.removeChild(currentFlexbox.childNodes[currentFlexbox.childNodes.length - 1]);
  //       const flexbox = document.createElement('div');
  //       flexbox.classList.add('flexbox');
  //       this.outerFlex.appendChild(flexbox);
  //       i = i - 2;
  //       console.log(i);
  //     }
  //     else{
  //       console.log('adding=' + i);
  //       const inner_flex = document.createElement('div');
  //       // inner_flex.innerText = i.toString(10);
  //       const video = document.createElement('video');
  //       video.style.height = 'inherit';
  //       video.style.width = 'inherit';
  //       inner_flex.appendChild(video);
  //       this.displayVideo(video);
  //       inner_flex.style.height = this.slider.value + 'vh';
  //       inner_flex.style.width = this.slider.value + 'vw';
  //       currentFlexbox.appendChild(inner_flex);
  //     }
  //   }
  // }

  // sliderInput(){
  //   this.outerFlex.innerHTML = '';
  //   // this.headStyle.innerHTML = ".flexbox > div{ height:" + this.slider.value + "vh;width:" + this.slider.value + "vh;}"
  //   const fb = document.createElement('div');
  //   fb.classList.add('flexbox');
  //   this.outerFlex.appendChild(fb);
  //   this.createGrid(this.participants);
  // }
  //
  // // ngOnInit(): void {
  // //   console.log("Lame")
  // // }
  //
  // setslider() {
  //   this.slider.style.visibility = 'visible';
  //   setTimeout(() => this.slider.style.visibility = 'hidden', 4000);
  // }

  // displayVideo(video){
  //   navigator.mediaDevices.getUserMedia({video: true}).then((ms: MediaStream) => {
  //     // const _video = video.nativeElement;
  //     video.srcObject = ms;
  //     video.play();
  //   });
  // }
}
