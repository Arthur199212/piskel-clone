/* eslint-disable no-param-reassign */
import { currentFrameIndex } from './frames';

export default class ShowCurrentFrame {
  constructor() {
    this.framesArray = [...document.querySelectorAll('.frame__unit')];
    this.frameWrapper = document.querySelector('.frames__wrapper');
  }

  highlightSelectedFrame() {
    this.framesArray = [...document.querySelectorAll('.frame__unit')]; // Refresh link

    this.framesArray.forEach((i) => {
      i.style.borderColor = 'rgb(68, 68, 68)';
    });

    this.framesArray[currentFrameIndex].style.borderColor = 'rgb(255, 215, 0)';
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.highlightSelectedFrame.bind(this));
  }
}
