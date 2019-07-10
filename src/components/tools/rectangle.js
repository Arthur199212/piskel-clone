/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import ResizeTool from '../features/resizeTool';

export default class Rectangle {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.color = '#000'; // default value
    this.pixelSize = undefined;
    this.paint = false;
    this.prevDot = [];
    this.currDot = [];
    // Add ability to paint with the right mouse buttom
    this.primaryColor = document.querySelector('#primary-color');
    this.secondaryColor = document.querySelector('#secondary-color');
    this.resizeTool = new ResizeTool();
    this.canvasBackground = document.querySelector('.canvas__background');
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.ctxBuffer = this.canvasBuffer.getContext('2d');
  }

  static canselDefaultRightClich(e) {
    e.preventDefault();
  }

  getRightCoordinate(x, y) {
    let startX = x;
    let startY = y;

    startX = Math.floor(startX / this.pixelSize) * this.pixelSize;
    startY = Math.floor(startY / this.pixelSize) * this.pixelSize;

    return [startX, startY];
  }

  drawPixel(x, y, placeToDraw) {
    placeToDraw.fillStyle = this.color;
    placeToDraw.fillRect(x, y, this.pixelSize, this.pixelSize);
  }

  startDrawing(e) {
    e.preventDefault();

    this.canvas = document.querySelector('.canvas__item'); // refresh link
    this.ctx = this.canvas.getContext('2d');
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.ctxBuffer = this.canvasBuffer.getContext('2d');

    // Get info about real pixel size
    this.pixelSize = this.resizeTool.getCurrentPixelSize();

    // Define what kind of button pressed -> choose correct color
    if (e.button === 0) {
      this.color = this.primaryColor.value;
    } else if (e.button === 2) {
      this.color = this.secondaryColor.value;
    }

    const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
    const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

    this.paint = true;

    const firstPoint = this.getRightCoordinate(x, y);

    this.drawPixel(firstPoint[0], firstPoint[1], this.ctxBuffer);

    this.prevDot = [...firstPoint];
  }

  draw(e, placeToDraw) {
    if (this.paint) {
      this.ctxBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

      if (!placeToDraw) {
        placeToDraw = this.ctxBuffer;
      }

      this.drawPixel(...this.prevDot, placeToDraw);

      const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
      const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

      this.currDot = this.getRightCoordinate(x, y);

      this.bresenhamAlgorithm(...this.prevDot, ...this.currDot, placeToDraw);
    }
  }

  bresenhamAlgorithm(x0, y0, x1, y1, placeToDraw) {
    const firstPoint = this.getRightCoordinate(x0, y0);
    const secondPoint = this.getRightCoordinate(x1, y1);

    let newX0 = firstPoint[0];
    let newY0 = firstPoint[1];
    let newX02 = firstPoint[0];
    let newY02 = firstPoint[1];
    const newX1 = secondPoint[0];
    const newY1 = secondPoint[1];

    const sx = (newX0 < newX1) ? this.pixelSize : -this.pixelSize;
    const sy = (newY0 < newY1) ? this.pixelSize : -this.pixelSize;

    while (true) {
      if (newX0 !== newX1) {
        newX0 += sx;
      } else if (newY0 !== newY1) {
        newY0 += sy;
      } else {
        break;
      }

      this.drawPixel(newX0, newY0, placeToDraw);
    }

    while (true) {
      if (newY02 !== newY1) {
        newY02 += sy;
      } else if (newX02 !== newX1) {
        newX02 += sx;
      } else {
        break;
      }

      this.drawPixel(newX02, newY02, placeToDraw);
    }
  }

  stopDrawing(e) {
    this.draw(e, this.ctx);

    this.paint = false;
  }

  init() {
    this.canvas = document.querySelector('.canvas__item'); // refresh link
    this.ctx = this.canvas.getContext('2d');
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.ctxBuffer = this.canvasBuffer.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background'); // refresh link

    // start drawing
    this.canvasBackground.addEventListener('mousedown', this.startDrawing.bind(this));
    // drawing
    this.canvasBackground.addEventListener('mousemove', this.draw.bind(this));
    // stop drawing
    this.canvasBackground.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvasBackground.addEventListener('mouseleave', this.stopDrawing.bind(this));

    // stop opening context menu with the right click
    this.canvasBackground.addEventListener('contextmenu', Rectangle.canselDefaultRightClich.bind(this));

    // Custom cursor
    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/rectangle.png\') 0 16, auto';
  }
}
