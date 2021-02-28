import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor() {
    navigator.mediaDevices.getUserMedia({video:true, audio:true})
      .then(stream=>{
        myVideoSteam = stream
        addVideoStream(myVideo,stream)
      })
  }

  ngOnInit(): void {
  }

}
