/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { currentFrameIndex } from '../frames/frames';

let timer = null;
const arrayOfPreviewImages = [];

export default class PreviewTool {
  constructor() {
    this.fpsInput = document.querySelector('#fps');
    this.previewBackground = document.querySelector('.preview__background');
    this.fullScreenButton = document.querySelector('#fullScreen');
  }

  show() {
    arrayOfPreviewImages.length = 0;
    clearInterval(timer);

    const frames = document.querySelectorAll('.frame__unit');
    const arrayOfFrames = [...frames];

    arrayOfFrames.map((i) => {
      arrayOfPreviewImages.push(i.style.backgroundImage);
    });

    const preview = document.querySelector('.preview__item');

    let interval = 1000 / 10;

    if (+this.fpsInput.value !== 0) {
      interval = 1000 / +this.fpsInput.value;
    } else {
      preview.style.backgroundImage = arrayOfPreviewImages[currentFrameIndex];
      interval = 0;
      return interval;
    }

    let indexOfImage = 0;

    timer = window.setInterval(() => {
      preview.style.backgroundImage = arrayOfPreviewImages[indexOfImage];
      indexOfImage >= arrayOfFrames.length ? indexOfImage = 0 : indexOfImage += 1;
    }, interval);
  }

  showFPS() {
    const fps = document.querySelector('#show-fps');

    fps.textContent = `${this.fpsInput.value} FPS`;
  }

  showFullScreenButton(e) {
    let { target } = e;

    while (target.className.indexOf('preview__background') < 0) {
      const targetName = target.className;

      if (targetName.indexOf('preview__item') >= 0) {
        this.fullScreenButton.style.display = 'block';
      }

      target = target.parentElement;
    }
  }

  hideFullScreenButton(e) {
    if (e.target.className.indexOf('preview__background') >= 0) {
      this.fullScreenButton.style.display = 'none';
    }
  }

  init() {
    this.fpsInput.addEventListener('input', this.show.bind(this));
    this.fpsInput.addEventListener('input', this.showFPS.bind(this));

    // Show & hide fullScreen button
    this.previewBackground.addEventListener('mouseover', this.showFullScreenButton.bind(this));
    this.previewBackground.addEventListener('mouseleave', this.hideFullScreenButton.bind(this));
  }
}
