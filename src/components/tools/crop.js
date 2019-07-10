/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-lonely-if */
import ResizeTool from '../features/resizeTool';

export default class Crop {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.color = 'rgba(130, 163, 178, 0.5)'; // default value
    this.pixelSize = undefined;
    this.paint = false;
    this.selectArea = false;
    this.firstPoint = [0, 0];
    this.secondPoint = [0, 0];
    this.rectWidthCut = undefined;
    this.rectHeightCut = undefined;
    this.prevDot = [];
    this.currDot = [];
    this.drag = false;
    this.resizeTool = new ResizeTool();
    this.canvasBackground = document.querySelector('.canvas__background');
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.ctxBuffer = this.canvasBuffer.getContext('2d');
    this.canvasWrapper = document.querySelector('#canvas__wrapper');
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
    if (!this.selectArea && !this.inArea(e) && !this.paint) {
      e.preventDefault();

      this.canvas = document.querySelector('.canvas__item'); // Refresh link
      this.ctx = this.canvas.getContext('2d');
      this.canvasBuffer = document.querySelector('.canvas__buffer');
      this.ctxBuffer = this.canvasBuffer.getContext('2d');
      this.ctxBuffer.globalAlpha = 0.8;

      // Get info about real pixel size
      this.pixelSize = this.resizeTool.getCurrentPixelSize();

      const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
      const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

      this.paint = true;

      this.firstPoint = this.getRightCoordinate(x, y);

      this.secondPoint = [...this.firstPoint];
    }
  }

  draw(e, placeToDraw) {
    if (this.paint) {
      this.ctxBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

      this.selectArea = true;

      if (!placeToDraw) {
        placeToDraw = this.ctxBuffer;
      }

      const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
      const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

      this.secondPoint = this.getRightCoordinate(x, y);


      if (this.secondPoint[0] > this.firstPoint[0]) {
        this.rectWidthCut = this.secondPoint[0] - this.firstPoint[0] + this.pixelSize;
      } else if (this.secondPoint[0] === this.firstPoint[0]) {
        this.rectWidthCut = this.pixelSize;
      } else {
        this.rectWidthCut = this.secondPoint[0] - this.firstPoint[0] - this.pixelSize;
      }

      if (this.secondPoint[1] > this.firstPoint[1]) {
        this.rectHeightCut = this.secondPoint[1] - this.firstPoint[1] + this.pixelSize;
      } else if (this.secondPoint[0] === this.firstPoint[0]) {
        this.rectHeightCut = this.pixelSize;
      } else {
        this.rectHeightCut = this.secondPoint[1] - this.firstPoint[1] - this.pixelSize;
      }


      this.ctxBuffer.fillStyle = 'rgba(130, 163, 178)';
      this.ctxBuffer.fillRect(this.firstPoint[0], this.firstPoint[1], this.rectWidthCut, this.rectHeightCut);
    }
  }

  cut() {
    // Save croped image
    this.image2 = new Image();
    this.image2.src = this.canvas.toDataURL();


    // Add image to buffer
    this.ctxBuffer.drawImage(this.canvas, this.firstPoint[0], this.firstPoint[1], this.rectWidthCut, this.rectHeightCut,
      this.firstPoint[0], this.firstPoint[1], this.rectWidthCut, this.rectHeightCut);

    if (this.selectArea) {
      this.ctx.clearRect(this.firstPoint[0], this.firstPoint[1], this.rectWidthCut, this.rectHeightCut);
    }
  }

  stopDrawing() {
    if (this.paint) {
      this.cut();

      this.paint = false;
    }
  }

  moveStart(e) {
    if (this.selectArea && this.inArea(e) && !this.paint) {
      this.canvas = document.querySelector('.canvas__item'); // Refresh link
      this.ctx = this.canvas.getContext('2d');
      this.canvasBuffer = document.querySelector('.canvas__buffer');
      this.ctxBuffer = this.canvasBuffer.getContext('2d');

      this.image = new Image();
      this.image.src = this.canvasBuffer.toDataURL();

      const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
      const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

      this.prevDot = [x, y];

      this.drag = true;

      // Cursor style
      this.canvasWrapper.style.cursor = 'move';
    }
  }

  move(e) {
    if (this.drag) {
      this.ctxBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

      const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
      const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

      this.currDot = [x, y];

      const offsetXY = [this.currDot[0] - this.prevDot[0], this.currDot[1] - this.prevDot[1]];

      this.ctxBuffer.drawImage(this.image, ...offsetXY);
    }
  }

  moveStop(e) {
    if (this.drag) {
      this.drag = false;

      const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
      const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;

      const dX = this.firstPoint[0] - this.prevDot[0];
      const dY = this.firstPoint[1] - this.prevDot[1];

      this.currDot = [x + dX, y + dY];

      this.ctx.drawImage(this.image2, this.firstPoint[0], this.firstPoint[1], this.rectWidthCut, this.rectHeightCut, ...this.currDot, this.rectWidthCut, this.rectHeightCut);

      this.ctxBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

      this.selectArea = false;
      this.firstPoint = [0, 0];
      this.secondPoint = [0, 0];

      // Cursor style
      this.canvasWrapper.style.cursor = 'crosshair';
    }
  }

  unSelect(e) {
    if (this.selectArea && !this.inArea(e) && !this.paint) {
      this.ctx.drawImage(this.image2, ...this.firstPoint, this.rectWidthCut, this.rectHeightCut, ...this.firstPoint, this.rectWidthCut, this.rectHeightCut);

      this.ctxBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

      this.image2 = new Image();
      this.selectArea = false;
      this.firstPoint = [0, 0];
      this.secondPoint = [0, 0];

      this.paint = false;
    }
  }

  inArea(e) {
    const x = e.pageX - this.canvasBuffer.parentElement.offsetLeft;
    const y = e.pageY - this.canvasBuffer.parentElement.offsetTop;


    // 1 way of selecting
    if (this.firstPoint[0] < this.secondPoint[0] && this.firstPoint[1] < this.secondPoint[1]) {
      if (x < this.secondPoint[0] + this.pixelSize
        && x > this.firstPoint[0]) {
        if (y < this.secondPoint[1] + this.pixelSize
          && y > this.firstPoint[1]) { return true; }
      }
    }
    // 2 way of selecting
    if (this.firstPoint[0] > this.secondPoint[0] && this.firstPoint[1] > this.secondPoint[1]) {
      if (x < this.firstPoint[0]
        && x > this.secondPoint[0] - this.pixelSize) {
        if (y < this.firstPoint[1]
          && y > this.secondPoint[1] - this.pixelSize) { return true; }
      }
    }
    // 3 way of selecting
    if (this.firstPoint[0] > this.secondPoint[0] && this.firstPoint[1] < this.secondPoint[1]) {
      if (x < this.firstPoint[0]
        && x > this.secondPoint[0] - this.pixelSize) {
        if (y < this.secondPoint[1] + this.pixelSize
          && y > this.firstPoint[1]) { return true; }
      }
    }
    // 4 way of selecting
    if (this.firstPoint[0] < this.secondPoint[0] && this.firstPoint[1] > this.secondPoint[1]) {
      if (x < this.secondPoint[0] + this.pixelSize
        && x > this.firstPoint[0]) {
        if (y < this.firstPoint[1]
          && y > this.secondPoint[1] - this.pixelSize) { return true; }
      }
    }


    return false;
  }

  cursorEffect(e) {
    if (this.selectArea && this.inArea(e)) {
      this.canvasWrapper.style.cursor = 'move';
    } else if (this.drag) {
      this.canvasWrapper.style.cursor = 'move';
    } else {
      this.canvasWrapper.style.cursor = 'crosshair';
    }
  }

  init() {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link
    this.ctx = this.canvas.getContext('2d');
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.ctxBuffer = this.canvasBuffer.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');


    this.canvasBackground.addEventListener('mousedown', this.unSelect.bind(this));
    // Start drawing
    this.canvasBackground.addEventListener('mousedown', this.startDrawing.bind(this));
    // Drawing
    this.canvasBackground.addEventListener('mousemove', this.draw.bind(this));
    // Stop drawing
    this.canvasBackground.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvasBackground.addEventListener('mouseleave', this.stopDrawing.bind(this));

    // Move tool
    this.canvasBackground.addEventListener('mousedown', this.moveStart.bind(this));
    this.canvasBackground.addEventListener('mousemove', this.move.bind(this));
    this.canvasBackground.addEventListener('mouseup', this.moveStop.bind(this));

    // Stop opening context menu with the right click
    this.canvasBackground.addEventListener('contextmenu', Crop.canselDefaultRightClich.bind(this));

    // Custom cursor
    this.canvasBackground.addEventListener('mousemove', this.cursorEffect.bind(this));
    this.canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/stroke.png\') 0 16, auto';
  }
}
