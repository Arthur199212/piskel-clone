import { framesArray } from '../../components/frames/frames';

const UPNG = require('./UPNG');

export default class APNG {
  constructor() {
    this.size = undefined;
    this.downloadButton = document.querySelector('.apng__download');
  }

  getAllSprites() {
    const buffer = [];

    framesArray.forEach((iCanvas) => {
      const ctx = iCanvas.getContext('2d');
      const image = ctx.getImageData(0, 0, iCanvas.width, iCanvas.height).data;
      this.size = iCanvas.width;
      buffer.push(image);
    });

    return buffer;
  }

  makeAPNG() {
    const arrayFrames = this.getAllSprites();
    const dels = new Array(arrayFrames.length);
    dels.fill(200);

    // Use UPNG.js file for getting .apng
    const png = UPNG.encode([...arrayFrames], this.size, this.size, 0, [...dels]);

    const arrayAPNG = new Uint8Array(png);

    // Transforn from Uint8Array to base64
    const base64Data = btoa(String.fromCharCode.apply(null, arrayAPNG));

    this.downloadButton.href = `data:image/png;base64,${base64Data}`;
  }

  init() {
    this.downloadButton.addEventListener('mousedown', this.makeAPNG.bind(this));
  }
}
