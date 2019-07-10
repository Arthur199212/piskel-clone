/* eslint-disable prefer-destructuring */
/* eslint-disable no-array-constructor */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable quote-props */
import { framesArray } from '../../components/frames/frames';

import API from './gifshot';

export default class GIFMaker {
  constructor() {
    this.size = undefined;
    this.gifDownloadButton = document.querySelector('.gif__download');
  }

  getAllSprites() {
    const buffer = [];

    framesArray.forEach((iCanvas) => {
      const image = iCanvas.toDataURL();
      this.size = iCanvas.width;
      buffer.push(image);
    });

    return buffer;
  }

  makeGIF() {
    const arrayFrames = this.getAllSprites();

    if (!this.gifDownloadButton.getAttribute('data-download')) {
      // Resourse https://github.com/yahoo/gifshot
      API.createGIF({
        'images': [...arrayFrames],
        // Desired width of the image
        'gifWidth': this.size,
        // Desired height of the image
        'gifHeight': this.size,
        // The amount of time (in seconds) to wait between each frame capture
        'interval': 0.2,
      }, function (obj) {
        if (!obj.error) {
          const { image } = obj;

          const gifDownloadButton = document.querySelector('.gif__download');
          gifDownloadButton.href = image;
          gifDownloadButton.setAttribute('download', 'animated-image-gif');
          gifDownloadButton.setAttribute('data-download', 'loadFile');
        }
      });

      setTimeout(() => {
        const gifDownloadButton = document.querySelector('.gif__download');
        gifDownloadButton.click();
      }, 1000);
    } else {
      const gifDownloadButton = document.querySelector('.gif__download');
      gifDownloadButton.removeAttribute('data-download');
      setTimeout(() => {
        gifDownloadButton.removeAttribute('download');
      }, 200);
    }
  }

  init() {
    this.gifDownloadButton.addEventListener('click', this.makeGIF.bind(this));
  }
}
