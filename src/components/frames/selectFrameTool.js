import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import CheckIndex from './checkIndex';
import DrawNewFrame from './drawNewFrame';
import PreviewTool from '../preview/preview';
import ResizeOfCanvas from '../../screens/canvas/resizeOfCanvas';
import CheckCurrentTool from '../../screens/canvas/checkCurrentTool';

export default class SelectFrameTool {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.cloneCanvas = new CloneCanvas();
    this.emptyFrame = document.querySelector('.frame__unit');
    this.drawNewFrame = new DrawNewFrame(this.emptyFrame);
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.previewTool = new PreviewTool();
    this.resizeOfCanvas = new ResizeOfCanvas();
    this.checkCurrentTool = new CheckCurrentTool();
  }

  selectFrame(e) {
    const targetClass = e.target.className;
    const targetParentClass = e.target.parentElement.className;

    if (targetClass.indexOf('frame__unit') >= 0 || targetParentClass.indexOf('frame__unit') >= 0) {
      this.canvas = document.querySelector('.canvas__item'); // Refresh link

      framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas); // Save prev canvas

      setCurrentFrameIndex(CheckIndex.check(e));

      const canvasParent = this.canvas.parentNode;

      // Get selected canvas
      const elemToInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);

      canvasParent.replaceChild(elemToInsert, this.canvas);

      const newCanvas = canvasParent.children[0];
      newCanvas.setAttribute('class', 'canvas__item');

      // Resize if it's required
      this.resizeOfCanvas.changeSize();

      // Choose pverious active tool
      this.checkCurrentTool.activePreviousTool();

      // Add preview
      this.previewTool.show();
    }
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.selectFrame.bind(this));
  }
}
