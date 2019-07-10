/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
export default class FillBucket {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.colorLayer = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    this.primaryColor = document.querySelector('#primary-color');
    this.secondaryColor = document.querySelector('#secondary-color');
    this.targetColor = null;
    this.startR = 0;
    this.startG = 0;
    this.startB = 0;
    this.startA = 1;
    this.canvasBackground = document.querySelector('.canvas__background');
  }

  static canselDefaultRightClich(e) {
    e.preventDefault();
  }

  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  getStartPoint(e) {
    const x = e.pageX - this.canvas.parentElement.offsetLeft;
    const y = e.pageY - this.canvas.parentElement.offsetTop;

    const pixel = this.ctx.getImageData(x, y, 1, 1);

    this.startR = pixel.data[0];
    this.startG = pixel.data[1];
    this.startB = pixel.data[2];
    this.startA = pixel.data[3] / 255;
  }

  colorPixels(data) {
    for (let i = 0; i < data.length; i += 4) {
      const matchesRedTarget = this.startR === data[i];
      const matchesGreenTarget = this.startG === data[i + 1];
      const matchesBlueTarget = this.startB === data[i + 2];

      if (matchesRedTarget && matchesGreenTarget && matchesBlueTarget) {
        data[i] = this.targetColor.r;
        data[i + 1] = this.targetColor.g;
        data[i + 2] = this.targetColor.b;
        data[i + 3] = 255;
      }
    }
  }

  paint(e) {
    // Define what kind of button pressed -> choose correct color
    if (e.button === 0) {
      this.targetColor = this.primaryColor.value;
    } else if (e.button === 2) {
      this.targetColor = this.secondaryColor.value;
    }

    // Refresh links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.colorLayer = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

    this.getStartPoint(e);

    // Stop working if target color and start color are the same
    this.targetColor = FillBucket.hexToRgb(this.targetColor);
    if (this.targetColor.r === this.startR && this.targetColor.g === this.startG && this.targetColor.b === this.startB) {
      return false;
    }

    this.colorPixels.bind(this);
    this.colorPixels(this.colorLayer.data);

    this.ctx.putImageData(this.colorLayer, 0, 0);
  }

  init() {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link
    this.canvasBackground = document.querySelector('.canvas__background');


    this.canvasBackground.addEventListener('mousedown', this.paint.bind(this));

    // Stop opening context menu with the right click
    this.canvasBackground.addEventListener('contextmenu', FillBucket.canselDefaultRightClich.bind(this));

    // Custom cursor
    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/paint-bucket.png\') 16 16, auto';
  }
}
