/* eslint-disable import/no-duplicates */
import ResizeTool from './resizeTool';
import { index, sizes } from './resizeTool';

export default class CanvasData {
  constructor() {
    this.canvasSize = document.querySelector('#canvas_size');
    this.coordinates = document.querySelector('#coordinates');
    this.canvasWrapper = document.querySelector('#canvas__wrapper');
    this.canvas = document.querySelector('.canvas__item');
    this.canvasBackground = document.querySelector('.canvas__background');
    this.ctx = this.canvas.getContext('2d');
    this.resizeButton = document.querySelector('.resize__button');
    this.pixelSize = 19; // Default value
    this.resizeTool = new ResizeTool();
    this.data = 32; // Default start value
  }

  getRightCoordinate(x, y) {
    let startX = x;
    let startY = y;

    startX = Math.floor(startX / this.pixelSize) * this.pixelSize;
    startY = Math.floor(startY / this.pixelSize) * this.pixelSize;

    return [startX, startY];
  }

  hideCoordinates() {
    this.coordinates.textContent = '';
  }

  showCoordinates(e) {
    // Refresh link
    this.canvasBackground = document.querySelector('.canvas__background');
    this.canvas = document.querySelector('.canvas__item');

    const x = e.pageX - this.canvas.parentElement.offsetLeft;
    const y = e.pageY - this.canvas.parentElement.offsetTop;

    // Get info about real pixel size
    this.pixelSize = this.resizeTool.getCurrentPixelSize();

    const currentPosition = this.getRightCoordinate(x, y);

    const coordinateX = currentPosition[0] / this.pixelSize;
    const coordinateY = currentPosition[1] / this.pixelSize;

    if (coordinateX < 0 || coordinateX > this.data - 1
      || coordinateY < 0 || coordinateY > this.data - 1) {
      this.coordinates.textContent = '';
    } else {
      this.coordinates.textContent = `${coordinateX} : ${coordinateY}`;
    }
  }

  showSize() {
    this.data = sizes[index];

    this.canvasSize.textContent = `[ ${this.data} x ${this.data} ]`;
  }

  init() {
    this.resizeButton.addEventListener('click', this.showSize.bind(this));
    this.canvasWrapper.addEventListener('mousemove', this.showCoordinates.bind(this));
    this.canvasBackground.addEventListener('mouseleave', this.hideCoordinates.bind(this));
  }
}
