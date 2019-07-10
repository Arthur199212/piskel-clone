import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import CheckIndex from './checkIndex';
import DrawNewFrame from './drawNewFrame';
import SetFramePrev from './setFramePrev';
import PreviewTool from '../preview/preview';
import CheckCurrentTool from '../../screens/canvas/checkCurrentTool';

export default class CloneFrameTool {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.cloneCanvas = new CloneCanvas();
    this.prevFrame = 0;
    this.currentFrame = 0;
    this.emptyFrame = document.querySelector('.frame__background');
    this.drawNewFrame = new DrawNewFrame(this.emptyFrame);
    this.setFramePrev = new SetFramePrev();
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.previewTool = new PreviewTool();
    this.checkCurrentTool = new CheckCurrentTool();
  }

  run(e) {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link

    if (e.target.className.indexOf('copy') > -1) {
      framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas); // Save prev canvas

      setCurrentFrameIndex(CheckIndex.check(e));

      framesArray.push(framesArray[currentFrameIndex]);

      const frames = document.querySelectorAll('.frame__unit');
      const arrayOfFrames = [...frames];
      const elem = arrayOfFrames[currentFrameIndex];
      const neadedFramePrev = elem.style.backgroundImage;

      const canvasParent = this.canvas.parentElement;


      this.canvas = document.querySelector('.canvas__item'); // Refresh link

      const elemToInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);

      canvasParent.replaceChild(elemToInsert, this.canvas);

      const newCanvas = canvasParent.children[0];
      newCanvas.setAttribute('class', 'canvas__item');

      this.prevFrame = this.currentFrame;
      this.currentFrame += 1;

      const newIndex = framesArray.length;

      this.drawNewFrame.init(newIndex);

      this.setFramePrev.init(null, neadedFramePrev);

      setCurrentFrameIndex(framesArray.length - 1);

      // Choose pverious active tool
      this.checkCurrentTool.activePreviousTool();

      // Add preview
      this.previewTool.show();
    }
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.run.bind(this));
  }
}
