import { currentFrameIndex, framesArray } from './frames';
import PreviewTool from '../preview/preview';
import CloneCanvas from './cloneCanvas';

export default class SetFramePrev {
  constructor(emptyDataURL) {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.emptyDataURL = emptyDataURL;
    this.cloneCanvas = new CloneCanvas();
  }

  setEmpty() {
    const frames = document.querySelectorAll('.frame__unit');
    const arrayOfFrames = [...frames];
    const elem = arrayOfFrames[currentFrameIndex];

    elem.style.backgroundImage = `url('${this.emptyDataURL}')`;
  }

  init(e, spesificPrev) {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link
    const frames = document.querySelectorAll('.frame__unit');

    const arrayOfFrames = [...frames];

    framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas); // Save canvas

    if (!spesificPrev) {
      const dataURL = this.canvas.toDataURL();
      const elem = arrayOfFrames[currentFrameIndex];

      elem.style.backgroundImage = `url('${dataURL}')`;
    } else {
      const elem = arrayOfFrames[arrayOfFrames.length - 1];

      elem.style.backgroundImage = spesificPrev;
    }

    this.previewTool = new PreviewTool();

    // Add preview
    this.previewTool.show();
  }
}
