/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

let currentFrameIndex = 0;
const framesArray = [];

function setCurrentFrameIndex(value) {
  currentFrameIndex = value;
}

export default class Frames {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.canvasHeight = this.canvas.height;
    this.frameWrapper = document.querySelector('.frames__wrapper');
  }

  showFramesButtons(e) {
    let { target } = e;

    while (target.className.indexOf('frames__wrapper') < 0) {
      const targetName = target.className;

      if (targetName.indexOf('frame__unit') >= 0) {
        this.hideAllFramesButtons();

        const arrayOfFrameButtons = [...target.children];
        arrayOfFrameButtons.map(i => i.style.display = 'block');
      }

      target = target.parentElement;
    }
  }

  // Show & Hide Frame Buttons
  hideFramesButtons(e) {
    if (e.target.className.indexOf('frames__wrapper') >= 0) {
      this.hideAllFramesButtons();
    }
  }

  hideAllFramesButtons() {
    const arrayOfAllFrameButtons = [...document.querySelectorAll('.hide-button')];
    arrayOfAllFrameButtons.map(i => i.style.display = 'none');
  }

  init() {
    this.frameWrapper.style.height = this.canvasHeight;

    // Show frame buttons
    this.frameWrapper.addEventListener('mouseover', this.showFramesButtons.bind(this));
    // Hide frame buttons
    this.frameWrapper.addEventListener('mouseover', this.hideFramesButtons.bind(this));
    this.frameWrapper.addEventListener('mouseleave', this.hideAllFramesButtons.bind(this));
  }
}

export { currentFrameIndex, setCurrentFrameIndex, framesArray };
