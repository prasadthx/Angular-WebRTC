import {AfterViewInit, Component, ElementRef, Injectable, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {SignalingService} from './signaling.service';
import {ActivatedRoute, Router} from '@angular/router';
import { io } from 'socket.io-client';
import { ToastrService} from 'ngx-toastr';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IToastButton } from './acceptRejectCallToast';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit, AfterViewInit {
  public socket;
  private toastRef;

  constructor(
        private signalingService: SignalingService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private domSanitizer: DomSanitizer,
        private readonly dompurifySanitizer: NgDompurifySanitizer) {
          console.log('In constructor');
  }

  @ViewChild('slide', {read: ElementRef}) slide: ElementRef;
  // @ViewChild('flexbox', {read:ElementRef}) flexbox:ElementRef
  @ViewChild('myRange', {read: ElementRef}) myrange: ElementRef;
  @ViewChild('headStyle', {read: ElementRef}) headstyle: ElementRef;
  @ViewChild('userVideo', {read: ElementRef}) userVideo: ElementRef;
  @ViewChild('peerVideo', { read: ElementRef}) peerVideo: ElementRef;
  @ViewChild('calls', { read: ElementRef}) callsdisplay: ElementRef;

  host;

  userName;

  peervideo;
  uservideo;
  callsDisplay;
  flexBox;
  outerFlex;
  slider;
  headStyle;
  userstream;
  joiner = false;
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

  peersConnected = [];

  peers = [];

  socketId: string;

  currentVideoTag;

  currentVideoLabelTag;

  trackCounter = 0;

  peerCounter = 0;

  ngOnInit(): void {

    this.displayStream();

    this.route.queryParams.subscribe(params => {
      if (params.code && params.username){
        console.log(params.code);
        if (params.code.endsWith('1')){
          this.host = true;
          this.roomName = params.code;
          this.userName = params.username;
          this.signalingService.joinAsHost(params.code);
        }
        else {
          this.userName = params.username;
          this.signalingService.roomJoin(params.code, params.username);
        }
      }
    });
    // this.displayStream();
    this.signalingService.getRoomCreatedStatus().subscribe((userObject) => {
      console.log('Room created: ' + userObject.userName);
      // this.displayStream();
      this.peers.push(userObject);
      // this.creator = false;
      this.acceptRejectCall();
        // this.displayStream();
        // this.signalingService.socket.emit('ready', this.roomName);
    });

    this.signalingService.callCancelled().subscribe( () => {
      // this.signalingService.socket.emit('disconnect');
      this.router.navigate(['../../auth']);
    });

    this.signalingService.onPeerReady().subscribe( (paramsList) => {
      this.roomName = paramsList[0];
      console.log(this.userstream);
      this.joiner = true;
      console.log('Peer ready function, proceed to peerConnection');
      this.peerConnection(paramsList[1]);
    });

    this.signalingService.onCandidate().subscribe( (candidate) => {
      const icecandidate = new RTCIceCandidate(candidate);
      console.log('New Rtc Ice candidate added');
      this.rtcPeerConnection.addIceCandidate(icecandidate);
    });

    this.signalingService.onReceiveOffer().subscribe((paramsList) => {
      //this.currentVideoTag = document.createElement('video');
      console.log('Offer received, proceed to onOffer');
      //this.flexBox.appendChild(this.currentVideoTag);
      this.onOffer(paramsList[0], paramsList[1]);
    });

    this.signalingService.onAnswer().subscribe( (answer) => {
      // this.currentVideoTag = document.createElement('video');
      // this.flexBox.appendChild(this.currentVideoTag);
      console.log('Answer received, remote description set');
      console.log(answer);
      this.rtcPeerConnection.setRemoteDescription(<RTCSessionDescriptionInit> answer).then((success) => {
        console.log("successful");
      }).catch((error) => {
        console.log(error);
      });
    });

  }


  ngAfterViewInit(): void {
    this.outerFlex = this.slide.nativeElement;
    console.log(this.outerFlex);
    // this.flexBox = this.flexbox.nativeElement
    this.flexBox = document.getElementsByClassName('flexbox')[0];
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
    // this.peervideo = this.peerVideo.nativeElement;
    // this.callsDisplay = this.callsdisplay.nativeElement;
  }


  displayStream(): void {
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


  peerConnection(socketId): void {
      this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
      console.log(this.signalingService.socket);
      this.rtcPeerConnection.onicecandidate = (event) => { if (event.candidate){this.signalingService.socket.emit('candidate', event.candidate, `${this.roomName}`); }};
      this.rtcPeerConnection.ontrack = (event) => {
        if (this.trackCounter === 3){
          this.trackCounter = 0;
          this.peerCounter += 1;
        }
        else if (this.trackCounter === 0) {
          const div = document.createElement('div');
          this.currentVideoLabelTag = document.createElement('p');
          this.currentVideoTag = document.createElement('video');
          div.appendChild(this.currentVideoTag);
          div.appendChild(this.currentVideoLabelTag);
          this.flexBox.appendChild(div);
          this.trackCounter += 1;
        }
        else {
          console.log('In on Track Function');
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < event.streams.length; i++) {
            // console.log('I value:' + i);
            // const peerVideo = document.createElement('video');
            // peerVideo.classList.add('peerVideo');
            // peerVideo.srcObject = event.streams[i];
            // peerVideo.onloadedmetadata = (e) => { peerVideo.play(); };
            // this.flexBox.appendChild(peerVideo);
            // console.log(this.flexBox);
            this.currentVideoTag.classList.add('peerVideo');
            this.currentVideoLabelTag.innerText = this.peersConnected[this.peerCounter];
            this.currentVideoTag.srcObject = event.streams[i];
            this.currentVideoTag.onloadedmetadata = (e) => this.currentVideoTag.play();
          }
          this.trackCounter += 1;
        }
      };
      // this.rtcPeerConnection.ontrack = this.onTrackFunction;
      console.log(this.userstream);
      // const remoteStream = new MediaStream();
      // remoteStream.addTrack(this.userstream.getTracks()[0]);
      // remoteStream.addTrack(this.userstream.getTracks()[1]);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[0], this.userstream);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[1], this.userstream);
      // this.rtcPeerConnection.addTrack(remoteStream);
      this.rtcPeerConnection
        .createOffer()
        .then((offer) => {
          this.rtcPeerConnection.setLocalDescription(offer);
          console.log('Offer Sent');
          console.log(`${this.roomName}`);
          this.signalingService.socket.emit('offer', offer, `${this.roomName}`, socketId);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  onOffer(offer, socketId): void {
      this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
      console.log(this.signalingService.socket);
      this.rtcPeerConnection.onicecandidate = (event) => { if (event.candidate){this.signalingService.socket.emit('candidate', event.candidate, `${this.roomName}`); }};
    this.rtcPeerConnection.ontrack = (event) => {
      if (this.trackCounter === 3){
        this.trackCounter = 0;
        this.peerCounter += 1;
      }
      else if (this.trackCounter === 0) {
        const div = document.createElement('div');
        this.currentVideoLabelTag = document.createElement('p');
        this.currentVideoTag = document.createElement('video');
        div.appendChild(this.currentVideoTag);
        div.appendChild(this.currentVideoLabelTag);
        this.flexBox.appendChild(div);
        this.trackCounter += 1;
      }
      else {
        console.log('In on Track Function');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < event.streams.length; i++) {
          // console.log('I value:' + i);
          // const peerVideo = document.createElement('video');
          // peerVideo.classList.add('peerVideo');
          // peerVideo.srcObject = event.streams[i];
          // peerVideo.onloadedmetadata = (e) => { peerVideo.play(); };
          // this.flexBox.appendChild(peerVideo);
          // console.log(this.flexBox);
          this.currentVideoTag.classList.add('peerVideo');
          this.currentVideoLabelTag.innerText = this.peersConnected[this.peerCounter];
          this.currentVideoTag.srcObject = event.streams[i];
          this.currentVideoTag.onloadedmetadata = (e) => this.currentVideoTag.play();
        }
        this.trackCounter += 1;
      }
    };
      // this.rtcPeerConnection.ontrack = this.onTrackFunction;
      console.log(this.userstream);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[0], this.userstream);
      this.rtcPeerConnection.addTrack(this.userstream.getTracks()[1], this.userstream);
      this.rtcPeerConnection.setRemoteDescription(offer);
      this.rtcPeerConnection
        .createAnswer()
        .then((answer) => {
          this.rtcPeerConnection.setLocalDescription(answer);
          console.log('Answer Sent');
          this.signalingService.socket.emit('answer', answer, socketId);
        })
        .catch((error) => {
          console.log(error);
        });

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
  // onTrackFunction(event) {
  //   this.peervideo.srcObject = event.streams[0];
  //   this.peervideo.onloadedmetadata = (e) => {
  //     this.peervideo.play();
  //   };
  // }

  onTrackFunction(event){
    const peerVideo = document.createElement('video');
    peerVideo.srcObject = event.streams[0];
    this.flexBox.appendChild(peerVideo);
    peerVideo.onloadedmetadata = (e) => {
      peerVideo.play();
    };
  }

  acceptRejectCall(): void {
        // const messageDiv = document.createElement('div');
        // messageDiv.classList.add('object-contain');
        // messageDiv.style.height = 'parent';
        // messageDiv.innerHTML = `"> Reject </button></p>`;
        // this.callsDisplay.appendChild(messageDiv);
    }

  rejectCall(socketId): void {
    console.log('Rejected Call');
    this.signalingService.socket.emit('callRejected', socketId);
    this.peers.splice(0, 1);
  }

  answerCall(user): void {
    console.log('answered call');
    this.signalingService.socket.emit('ready', (`${this.roomName}`), user.socketId);
    this.peers.splice(0, 1);
    this.socketId = user.socketId;
    this.peersConnected.push(user.userName);
    console.log(`${this.roomName}`);
  }

  removeElementsByClass(className): void {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
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
