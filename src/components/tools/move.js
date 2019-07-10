import CloneCanvas from '../frames/cloneCanvas';

export default class Move {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.image = null;
    this.canvasBackground = document.querySelector('.canvas__background');
    this.cloneCanvas = new CloneCanvas();
    this.drag = false;
  }

  static canselDefaultRightClich(e) {
    e.preventDefault();
  }

  moveStart(e) {
    this.canvas = document.querySelector('.canvas__item'); // refresh link
    this.ctx = this.canvas.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');

    this.image = new Image();
    this.image.src = this.canvas.toDataURL();

    const x = e.pageX - this.canvas.parentElement.offsetLeft;
    const y = e.pageY - this.canvas.parentElement.offsetTop;

    this.prevDot = [x, y];

    this.drag = true;
  }

  move(e) {
    if (this.drag) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const x = e.pageX - this.canvas.parentElement.offsetLeft;
      const y = e.pageY - this.canvas.parentElement.offsetTop;

      this.currDot = [x, y];

      const offsetXY = [this.currDot[0] - this.prevDot[0], this.currDot[1] - this.prevDot[1]];

      this.ctx.drawImage(this.image, ...offsetXY);
    }
  }

  moveStop() {
    this.drag = false;
  }

  init() {
    this.canvas = document.querySelector('.canvas__item'); // refresh link
    this.ctx = this.canvas.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');

    this.canvasBackground.addEventListener('mousedown', this.moveStart.bind(this));
    this.canvasBackground.addEventListener('mousemove', this.move.bind(this));
    this.canvasBackground.addEventListener('mouseup', this.moveStop.bind(this));

    // Stop opening context menu with the right click
    this.canvasBackground.addEventListener('contextmenu', Move.canselDefaultRightClich.bind(this));

    // Custom cursor
    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/hand.png\') 8 8, auto';
  }
}
