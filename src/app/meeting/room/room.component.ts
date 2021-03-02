import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements AfterViewInit{
  @ViewChild('slide',{read:ElementRef}) slide:ElementRef
  // @ViewChild('flexbox', {read:ElementRef}) flexbox:ElementRef
  @ViewChild('myRange', {read:ElementRef}) myrange:ElementRef
  @ViewChild('headStyle', {read:ElementRef}) headstyle:ElementRef
  flexBox
  outerFlex
  slider
  headStyle

  ngAfterViewInit(): void {
    this.outerFlex = this.slide.nativeElement
    console.log(this.outerFlex)
    // this.flexBox = this.flexbox.nativeElement
    this.flexBox = document.getElementsByClassName("flexbox");
    console.log(this.flexBox);

    console.log(this.flexBox)
    this.slider = this.myrange.nativeElement
    console.log(this.slider)
    console.log(this.headstyle)
    this.headStyle = document.getElementsByClassName("style")[0];
    console.log(this.headStyle);
    // this.headStyle = this.headstyle.nativeElement
    this.createGrid(this.participants)
    }

  participants = 10;

  checkOverflow(element) {
    return element.scrollHeight > element.offsetHeight || element.scrollWidth > element.clientWidth;
  }

  createGrid(number) {
    for(let i=0;i<=number;i++){
      let currentFlexbox = this.flexBox[this.flexBox.length-1];
      if(this.checkOverflow(currentFlexbox)){
        console.log("overflow");
        console.log(currentFlexbox.scrollHeight);
        console.log(currentFlexbox.offsetHeight);
        console.log(currentFlexbox.clientHeight);
        currentFlexbox.removeChild(currentFlexbox.childNodes[currentFlexbox.childNodes.length-1]);
        let flexbox = document.createElement("div");
        flexbox.classList.add("flexbox");
        this.outerFlex.appendChild(flexbox);
        i=i-2;
        console.log(i);
      }
      else{
        console.log("adding="+i);
        let inner_flex=document.createElement("div");
        // inner_flex.innerText = i.toString(10);
        let video = document.createElement("video");
        video.style["height"] = "inherit";
        video.style["width"] = "inherit";
        inner_flex.appendChild(video);
        this.displayVideo(video);
        inner_flex.style["height"] = this.slider.value+"vh"
        inner_flex.style["width"] = this.slider.value +"vw"
        currentFlexbox.appendChild(inner_flex);
      }
    }
  }

  sliderInput(){
    this.outerFlex.innerHTML = "";
    //this.headStyle.innerHTML = ".flexbox > div{ height:" + this.slider.value + "vh;width:" + this.slider.value + "vh;}"
    let fb = document.createElement("div")
    fb.classList.add("flexbox");
    this.outerFlex.appendChild(fb);
    this.createGrid(this.participants);
  }

  ngOnInit(): void {
    console.log("Lame")
  }

  setslider() {
    this.slider.style["visibility"] = "visible";
    setTimeout(()=>this.slider.style["visibility"] = "hidden", 4000);
  }

  displayVideo(video){
    navigator.mediaDevices.getUserMedia({video: true}).then((ms: MediaStream) => {
      // const _video = video.nativeElement;
      video.srcObject = ms;
      video.play();
    });
  }
}
