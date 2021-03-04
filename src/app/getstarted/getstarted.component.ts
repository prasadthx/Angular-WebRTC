import { Component, OnInit } from '@angular/core';
declare var VANTA;

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    VANTA.GLOBE({
      el: "#my-background",
      mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x343ab1,
  size: 0.80,
  backgroundColor: 0xd0a14
    })
  }

}
