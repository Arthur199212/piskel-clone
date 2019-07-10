import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import PreviewTool from '../preview/preview';
import CheckCurrentTool from '../../screens/canvas/checkCurrentTool';
import { wasDeleteFrameUsed } from './deleteFrame';

export default class DragAndDrop {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.cloneCanvas = new CloneCanvas();
    this.previewTool = new PreviewTool();
    this.checkCurrentTool = new CheckCurrentTool();
    this.dragAvailable = false;
    this.dragedItem = null;
    this.oldParentOfDragedItem = null;
    this.index = undefined;
    this.newIndex = undefined;
    this.bufferFrame = null;
  }

  setCorrectIndexes() {
    if (this.newIndex !== this.index) {
      this.canvas = document.querySelector('.canvas__item'); // Refresh link

      this.index -= 1;
      this.newIndex -= 1;

      framesArray[this.index] = CloneCanvas.clone(this.canvas); // Save prev canvas

      // Get selected canvas
      const canvasParent = this.canvas.parentNode;
      const elemToInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);
      canvasParent.replaceChild(elemToInsert, this.canvas);

      this.bufferFrame = framesArray[this.index];
      framesArray[this.index] = framesArray[this.newIndex];
      framesArray[this.newIndex] = this.bufferFrame;

      setCurrentFrameIndex(this.newIndex);

      // Set correct index of frame
      const frames = document.querySelectorAll('.frame__unit');
      for (let i = 0; i < frames.length; i += 1) {
        frames[i].children[1].textContent = `${i + 1}`;
      }

      // Choose pverious active tool
      this.checkCurrentTool.activePreviousTool();

      // Add preview
      this.previewTool.show();

      this.newIndex = undefined;
    }
  }

  pickUpItem(e) {
    let { target } = e;

    while (target.className.indexOf('frames__wrapper') < 0) {
      if (target.className.indexOf('frame__unit') >= 0) {
        this.dragAvailable = true;

        this.dragedItem = target;
        this.oldParentOfDragedItem = this.dragedItem.parentElement;

        this.startSpot = e.pageY;

        return;
      }

      target = target.parentElement;
    }
  }

  moveItem(e) {
    if (this.dragAvailable) {
      const y = e.pageY - this.dragedItem.offsetHeight / 2;

      this.dragedItem.style.zIndex = 100;
      this.dragedItem.style.position = 'absolute';
      this.dragedItem.style.top = `${y}px`;
    }
  }

  dropItem(e) {
    if (this.dragAvailable) {
      this.dragAvailable = false;

      if (wasDeleteFrameUsed[0]) { wasDeleteFrameUsed[0] = false; return; }

      this.index = this.dragedItem.children[1].textContent;

      const y = e.pageY;

      // Old Y parametor
      const parentY = this.oldParentOfDragedItem.offsetTop;
      const parentHeight = this.oldParentOfDragedItem.offsetHeight;

      // Return back if we are over the starting place
      if (y >= parentY && y <= parentHeight) {
        this.dragedItem.style.position = 'relative';
        this.dragedItem.style.zIndex = 'auto';
        this.dragedItem.style.top = 'auto';
        this.dragedItem.style.left = 'auto';

        this.newIndex = undefined;
        return;
      }

      const allFrames = document.querySelectorAll('.frame__unit');

      // If we are over some other frame -> swap
      for (let i = 0; i < allFrames.length; i += 1) {
        const parentToSwap = allFrames[i].parentElement;
        const parentToSwapY = parentToSwap.offsetTop;
        const parentToSwapHeight = parentToSwap.offsetHeight;

        if (y >= parentToSwapY && y <= parentToSwapY + parentToSwapHeight) {
          e.target.style.position = 'relative';
          e.target.style.zIndex = 'auto';
          e.target.style.top = 'auto';
          e.target.style.left = 'auto';

          parentToSwap.insertBefore(this.dragedItem, allFrames[i]);

          this.oldParentOfDragedItem.appendChild(allFrames[i]);

          this.newIndex = allFrames[i].children[1].textContent;
          this.setCorrectIndexes();
          return;
        }
      }

      // Return back if nothing else worked
      this.dragedItem.style.position = 'relative';
      this.dragedItem.style.zIndex = 'auto';
      this.dragedItem.style.top = 'auto';
      this.dragedItem.style.left = 'auto';

      this.newIndex = undefined;
    }
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.pickUpItem.bind(this));
    document.body.addEventListener('mousemove', this.moveItem.bind(this));
    document.body.addEventListener('mouseup', this.dropItem.bind(this));
  }
}
