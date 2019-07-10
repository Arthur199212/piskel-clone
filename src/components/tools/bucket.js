/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
const pixelStack = [];

export default class Bucket {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.startR = 0;
    this.startG = 0;
    this.startB = 0;
    this.startA = 1;
    this.colorLayer = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    this.primaryColor = document.querySelector('#primary-color');
    this.secondaryColor = document.querySelector('#secondary-color');
    this.targetColor = undefined;
    this.canvasBackground = document.querySelector('.canvas__background');
  }

  static canselDefaultRightClich(e) {
    e.preventDefault();
  }

  hexToRgb(hex) {
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

    return [x, y];
  }

  // Get start point color to be able to match
  matchStartColor(pixelPos) {
    const r = this.colorLayer.data[pixelPos];
    const g = this.colorLayer.data[pixelPos + 1];
    const b = this.colorLayer.data[pixelPos + 2];

    return (r === this.startR && g === this.startG && b === this.startB);
  }

  // Depends on active color (primary / secandary)
  colorPixel(pixelPos) {
    const color = this.hexToRgb(this.targetColor);

    const fillColorR = color.r;
    const fillColorG = color.g;
    const fillColorB = color.b;

    this.colorLayer.data[pixelPos] = fillColorR;
    this.colorLayer.data[pixelPos + 1] = fillColorG;
    this.colorLayer.data[pixelPos + 2] = fillColorB;
    this.colorLayer.data[pixelPos + 3] = 255;
  }


  paint(e) {
    // Define what kind of button pressed -> choose correct color
    if (e.button === 0) {
      this.targetColor = this.primaryColor.value;
    } else if (e.button === 2) {
      this.targetColor = this.secondaryColor.value;
    }

    // Refresh link
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.colorLayer = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);


    pixelStack.push(this.getStartPoint(e));

    // Stop working if target color and start color are the same
    const color = this.hexToRgb(this.targetColor);
    if (color.r === this.startR && color.g === this.startG && color.b === this.startB) {
      return false;
    }

    while (pixelStack.length) {
      let pixelPos;
      let reachLeft;
      let reachRight;
      const newPos = pixelStack.pop();
      const x = newPos[0];
      let y = newPos[1];

      pixelPos = (y * this.canvasWidth + x) * 4;
      while (y-- >= 0 && this.matchStartColor(pixelPos)) {
        pixelPos -= this.canvasWidth * 4;
      }
      pixelPos += this.canvasWidth * 4;
      ++y;
      reachLeft = false;
      reachRight = false;
      while (y++ < this.canvasHeight - 1 && this.matchStartColor(pixelPos)) {
        this.colorPixel(pixelPos);

        if (x > 0) {
          if (this.matchStartColor(pixelPos - 4)) {
            if (!reachLeft) {
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < this.canvasWidth - 1) {
          if (this.matchStartColor(pixelPos + 4)) {
            if (!reachRight) {
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += this.canvasWidth * 4;
      }
    }
    this.ctx.putImageData(this.colorLayer, 0, 0);
  }

  init() {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link
    this.canvasBackground = document.querySelector('.canvas__background');
    this.ctx = this.canvas.getContext('2d');

    this.canvasBackground.addEventListener('mousedown', this.paint.bind(this));

    // Stop opening context menu with the right click
    this.canvasBackground.addEventListener('contextmenu', Bucket.canselDefaultRightClich.bind(this));

    // Custom cursor
    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/paint-bucket.png\') 16 16, auto';
  }
}
