/* eslint-disable import/no-mutable-exports */
import PreviewTool from '../preview/preview';
import SetFramePrev from '../frames/setFramePrev';

let index = 0;
const sizes = [32, 64, 128]; // Default sizes = [32, 64, 128];

export default class ResizeTool {
  constructor() {
    this.resizeButton = document.querySelector('.resize__button');
    this.resizeInfo = document.querySelector('.resize__info');
    this.canvas = document.querySelector('.canvas__item');
    this.canvasBackground = document.querySelector('.canvas__background');
    this.previewTool = new PreviewTool();
    this.emptyDataURL = this.canvas.toDataURL();
    this.setFramePrev = new SetFramePrev(this.emptyDataURL);
    this.canvasBuffer = document.querySelector('.canvas__buffer');
  }

  changeSize() {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.canvasBackground = document.querySelector('.canvas__background');
    this.ctx = this.canvas.getContext('2d');

    index += 1;
    if (index > 2) {
      index = 0;
    }

    const currentCanvasSize = this.canvas.parentElement.offsetHeight;

    const newCanvasSize = Math.round(currentCanvasSize / sizes[index]) * sizes[index];


    // Save drawings
    const newCanvas = document.createElement('canvas');
    const contex = newCanvas.getContext('2d');
    newCanvas.width = `${newCanvasSize}`;
    newCanvas.height = `${newCanvasSize}`;
    // Centring drawings
    const diff = (newCanvasSize - this.canvas.width) / 2;
    contex.drawImage(this.canvas, diff, diff);


    // Resize canvas
    this.canvas.width = `${newCanvasSize}`;
    this.canvas.height = `${newCanvasSize}`;

    this.canvasBuffer.width = `${newCanvasSize}`;
    this.canvasBuffer.height = `${newCanvasSize}`;

    // Resize canvas background
    this.canvasBackground.style.height = `${newCanvasSize}px`;

    this.resizeInfo.textContent = `${sizes[index]} / ${sizes[index]}`;


    // Bring drawings back
    this.ctx.drawImage(newCanvas, 0, 0);


    // Add preview
    this.previewTool.show();
  }

  getCurrentPixelSize() {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link
    this.canvasBuffer = document.querySelector('.canvas__buffer');

    const currentCanvasSize = this.canvas.parentElement.offsetHeight;

    return currentCanvasSize / sizes[index];
  }

  init() {
    this.resizeButton.addEventListener('click', this.changeSize.bind(this));

    // Add frame preview
    this.resizeButton.addEventListener('click', this.setFramePrev.init.bind(this));
  }
}

export { index, sizes };
