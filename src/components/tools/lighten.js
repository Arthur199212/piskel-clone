/* eslint-disable no-unused-expressions */
import ResizeTool from '../features/resizeTool';

export default class Lighten {
  constructor() {
    this.canvasBackground = document.querySelector('.canvas__background');
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.primaryColor = document.querySelector('#primary-color');
    this.secondaryColor = document.querySelector('#secondary-color');
    this.light = false;
    this.resizeTool = new ResizeTool();
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

  startWork() {
    // Refresh links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    // Get info about real pixel size
    this.pixelSize = this.resizeTool.getCurrentPixelSize();

    this.light = true;
  }

  lightPixels(e) {
    if (this.light) {
      const x = e.pageX - this.canvas.parentElement.offsetLeft;
      const y = e.pageY - this.canvas.parentElement.offsetTop;

      const pixel = this.getRightCoordinate(x, y);

      const pixelToLight = this.ctx.getImageData(...pixel, this.pixelSize, this.pixelSize);
      const { data } = pixelToLight;

      for (let i = 0; i < data.length; i += 4) {
        data[i] >= 255 ? data[i] = 255 : data[i] += 10;
        data[i + 1] >= 255 ? data[i + 1] = 255 : data[i + 1] += 10;
        data[i + 2] >= 255 ? data[i + 2] = 255 : data[i + 2] += 10;
      }

      this.ctx.putImageData(pixelToLight, ...pixel, 0, 0, this.pixelSize, this.pixelSize);
    }
  }

  endWork() {
    this.light = false;
  }

  init() {
    this.canvasBackground = document.querySelector('.canvas__background');
    this.canvasBackground.addEventListener('mousedown', this.startWork.bind(this));
    this.canvasBackground.addEventListener('mousemove', this.lightPixels.bind(this));
    this.canvasBackground.addEventListener('mouseup', this.endWork.bind(this));

    // Prevent default opening of contextmenu
    this.canvasBackground.addEventListener('contextmenu', Lighten.canselDefaultRightClich.bind(this));

    // Custom cursor
    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/lighten.png\') 0 16, auto';
  }
}
