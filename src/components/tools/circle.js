/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import ResizeTool from '../features/resizeTool';

export default class Circle {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.color = '#000'; // default value
    this.pixelSize = this.canvas.width / this.numRows; // it works if pixel is square
    this.paint = false;
    this.prevDot = [];
    this.currDot = [];
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

    this.canvas = document.querySelector('.canvas__item'); // Refresh link
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

      const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
      const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

      this.currDot = this.getRightCoordinate(x, y);

      this.ellipseAlgorithm(...this.prevDot, ...this.currDot, placeToDraw);
    }
  }

  ellipseAlgorithm(x0, y0, x1, y1, placeToDraw) {
    // Find uper points
    const rX = Math.abs(x0 - x1) / 2;
    const rY = Math.abs(y0 - y1) / 2;

    const points = [];
    const points2 = [];

    let newX = 0 - rX;
    let newY = 0;

    const sx = (x0 < x1) ? this.pixelSize : -this.pixelSize;

    while (true) {
      if (newX === rX + sx) { break; }

      newY = Math.sqrt((1 - (newX ** 2) / (rX ** 2)) * (rY ** 2));

      points.push([newX + rX + x0, y0 + rY - newY]);

      newX += sx;
    }

    // Find buttom points
    newX = 0 - rX;
    newY = 0;

    while (true) {
      if (newX === rX + sx) { break; }

      newY = Math.sqrt((1 - (newX ** 2) / (rX ** 2)) * (rY ** 2));

      points2.push([newX + rX + x0, y0 + rY + newY]);

      newX += sx;
    }

    points2.reverse();

    // Get all the points together
    const pointsAll = [...points, ...points2];

    // Get proper coordinates
    for (let i = 0; i < pointsAll.length; i += 1) {
      pointsAll[i] = this.getRightCoordinate(...pointsAll[i]);
    }

    // Draw an ellipse
    for (let i = 0; i < pointsAll.length - 1; i += 1) {
      pointsAll[i] = this.getRightCoordinate(...pointsAll[i]);
      this.bresenhamAlgorithm(...pointsAll[i], ...pointsAll[i + 1], placeToDraw);
    }
  }

  bresenhamAlgorithm(x0, y0, x1, y1, placeToDraw) {
    const firstPoint = this.getRightCoordinate(x0, y0);
    const secondPoint = this.getRightCoordinate(x1, y1);

    let newX0 = firstPoint[0];
    let newY0 = firstPoint[1];
    const newX1 = secondPoint[0];
    const newY1 = secondPoint[1];

    if (isNaN(newX0) || isNaN(newY0) || isNaN(newX1) || isNaN(newY1)) {
      return;
    }

    const dx = Math.abs(newX1 - newX0);
    const dy = Math.abs(newY1 - newY0);
    const sx = (newX0 < newX1) ? this.pixelSize : -this.pixelSize;
    const sy = (newY0 < newY1) ? this.pixelSize : -this.pixelSize;
    let err = dx - dy;

    let i = 0;

    while (true && i < 100) {
      if ((newX0 === newX1) && (newY0 === y1)) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        newX0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        newY0 += sy;
      }

      this.drawPixel(newX0, newY0, placeToDraw);

      i += 1;
    }
  }

  stopDrawing(e) {
    this.draw(e, this.ctx);

    this.paint = false;
  }

  init() {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link
    this.ctx = this.canvas.getContext('2d');
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.ctxBuffer = this.canvasBuffer.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');

    // Start drawing
    this.canvasBackground.addEventListener('mousedown', this.startDrawing.bind(this));
    // Drawing
    this.canvasBackground.addEventListener('mousemove', this.draw.bind(this));
    // Stop drawing
    this.canvasBackground.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvasBackground.addEventListener('mouseleave', this.stopDrawing.bind(this));

    // Stop opening context menu with the right click
    this.canvasBackground.addEventListener('contextmenu', Circle.canselDefaultRightClich.bind(this));

    // Custom cursor
    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/circle.png\') 0 16, auto';
  }
}
