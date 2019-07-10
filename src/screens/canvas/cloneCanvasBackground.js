import CloneCanvas from '../../components/frames/cloneCanvas';
import { currentFrameIndex, framesArray } from '../../components/frames/frames';

export default class CloneCanvasBackground {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.canvasBackground = document.querySelector('.canvas__background');
    this.cloneCanvas = new CloneCanvas();
  }

  init() {
    this.canvasBackground = document.querySelector('.canvas__background'); // refresh link

    const newBackgroundElement = this.canvasBackground.cloneNode(true);
    newBackgroundElement.classList.add('canvas__background');

    const canvasBackgroundParent = this.canvasBackground.parentNode;

    canvasBackgroundParent.replaceChild(newBackgroundElement, this.canvasBackground);


    this.canvas = document.querySelector('.canvas__item'); //  refresh link

    const canvasParent = this.canvas.parentNode;
    const elemToInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);
    if (elemToInsert) {
      canvasParent.replaceChild(elemToInsert, this.canvas);
    }

    const newCanvas = canvasParent.children[0];
    newCanvas.className = 'canvas__item';
  }
}
