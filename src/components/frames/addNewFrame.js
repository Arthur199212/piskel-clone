import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import DrawNewFrame from './drawNewFrame';
import SetFramePrev from './setFramePrev';
import PreviewTool from '../preview/preview';
import CheckCurrentTool from '../../screens/canvas/checkCurrentTool';
import ShowCurrentFrame from './showCurrentFrame';

export default class AddNewFrame {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.emptyCanvas = CloneCanvas.clone(this.canvas);
    this.emptyDataURL = this.canvas.toDataURL(); // TODO
    this.emptyFrame = document.querySelector('.frame__background');
    this.setFramePrev = new SetFramePrev(this.emptyDataURL);
    this.cloneCanvas = new CloneCanvas();
    this.drawNewFrame = new DrawNewFrame(this.emptyFrame);
    this.previewTool = new PreviewTool();
    this.checkCurrentTool = new CheckCurrentTool();
    this.showCurrentFrame = new ShowCurrentFrame();
  }

  addFrame() {
    // Renew links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    // Save prev canvas
    framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas);

    // Clean canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    setCurrentFrameIndex(framesArray.length);

    framesArray.push(this.emptyCanvas);

    this.drawNewFrame.init(currentFrameIndex + 1);

    // !!! DRAG
    this.showCurrentFrame.highlightSelectedFrame();
    // !!! DRAG

    // Add frame preview
    this.setFramePrev.setEmpty(currentFrameIndex);

    // Choose previous active tool
    this.checkCurrentTool.activePreviousTool();

    // Add preview
    this.previewTool.show();
  }
}
