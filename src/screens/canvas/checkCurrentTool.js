/* eslint-disable import/no-mutable-exports */
/* eslint-disable array-callback-return */
// * Tools : start
import Pen from '../../components/tools/pen';
import Mirror from '../../components/tools/mirror';
import Bucket from '../../components/tools/bucket';
import FillBucket from '../../components/tools/fill-bucket';
import Eraser from '../../components/tools/eraser';
import Stroke from '../../components/tools/stroke';
import Rectangle from '../../components/tools/rectangle';
import Circle from '../../components/tools/circle';
import Move from '../../components/tools/move';
import Crop from '../../components/tools/crop';
import Lighten from '../../components/tools/lighten';
import Dithering from '../../components/tools/dithering';
import ColorPickerCanvas from '../../components/tools/color-picker-canvas';
// * Tool : end
import CloneCanvasBackground from './cloneCanvasBackground';

let currentTool = 'pen';

export default class CheckCurrentTool {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.toolsWrapper = document.querySelector('.tools__wrapper');
    this.allToolsItems = document.querySelectorAll('.tools__item');
    // * Tools : start
    this.penTool = new Pen();
    this.mirrorTool = new Mirror();
    this.bucketTool = new Bucket();
    this.fillBucketTool = new FillBucket();
    this.eraserTool = new Eraser();
    this.strokeTool = new Stroke();
    this.rectangle = new Rectangle();
    this.circle = new Circle();
    this.move = new Move();
    this.crop = new Crop();
    this.lighten = new Lighten();
    this.dithering = new Dithering();
    this.colorPickerCanvas = new ColorPickerCanvas();
    // * Tool : end
    this.cloneCanvasBackground = new CloneCanvasBackground();
  }

  static canselDefaultRightClich(e) {
    e.preventDefault();
  }

  static cloneCanvas(prevCanvas) {
    // create a new canvas
    const newCanvas = document.createElement('canvas');
    newCanvas.classList.add('canvas__item');
    const ctx = newCanvas.getContext('2d');

    // set dimensions
    newCanvas.width = prevCanvas.width;
    newCanvas.height = prevCanvas.height;

    // apply the old canvas to the new one
    ctx.drawImage(prevCanvas, 0, 0);

    // return the new canvas
    return newCanvas;
  }

  deletePrevFeature() {
    this.canvas = document.querySelector('.canvas__item'); // refresh link to actual canvas

    const prevCanvas = this.canvas;
    const newCanvas = CheckCurrentTool.cloneCanvas(prevCanvas);
    prevCanvas.parentNode.replaceChild(newCanvas, prevCanvas);

    this.canvas = newCanvas;

    this.cloneCanvasBackground.init();

    this.canvas.addEventListener('contextmenu', CheckCurrentTool.canselDefaultRightClich.bind(this));
  }

  highlight(targetToHighlite) {
    const arrayOfTools = [...this.allToolsItems];

    arrayOfTools.map((i) => {
      i.classList.remove('highlight_tool');
    });

    targetToHighlite.classList.add('highlight_tool');
  }

  setTool(target) {
    this.deletePrevFeature();

    switch (currentTool) {
      case 'pen':
        this.penTool.init();
        break;

      case 'mirror':
        this.mirrorTool.init();
        break;

      case 'eraser':
        this.eraserTool.init();
        break;

      case 'paint-bucket':
        this.bucketTool.init();
        break;

      case 'fill-bucket':
        this.fillBucketTool.init();
        break;

      case 'stroke':
        this.strokeTool.init();
        break;

      case 'rectangle':
        this.rectangle.init();
        break;

      case 'circle':
        this.circle.init();
        break;

      case 'move':
        this.move.init();
        break;

      case 'crop':
        this.crop.init();
        break;

      case 'lighten':
        this.lighten.init();
        break;

      case 'dithering':
        this.dithering.init();
        break;

      case 'color-picker':
        this.colorPickerCanvas.init();
        break;

      default:
        this.penTool.init();
        break;
    }

    // Highlight choosen tool
    this.highlight(target);
  }

  defineTool(e) {
    let { target } = e;
    let toolToHighlit = null;

    while (target.tagName !== 'UL') {
      currentTool = target.getAttribute('data-tool');

      toolToHighlit = target;
      target = target.parentElement;
    }

    this.setTool(toolToHighlit);
  }

  static setCurrentTool(name) {
    currentTool = name;
  }

  activePreviousTool() {
    const currentActiveTool = document.querySelector('.highlight_tool');
    currentTool = currentActiveTool.getAttribute('data-tool');
    this.setTool(currentActiveTool);
  }

  init() {
    const currentActiveTool = document.querySelector('.highlight_tool');
    this.setTool(currentActiveTool);

    this.toolsWrapper.addEventListener('click', this.defineTool.bind(this));
  }
}
