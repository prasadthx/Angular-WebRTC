import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {
  private url = 'http://localhost:5000';
  private socket;

  constructor() {

  }

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
  }

}

