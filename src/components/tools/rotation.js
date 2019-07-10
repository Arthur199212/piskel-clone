export default class Rotation {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.image = null;
    this.canvasBackground = document.querySelector('.canvas__background');
    this.rotationButton = document.querySelector('.rotation__button');
    this.degrees = 90; // default
  }

  turnClockwise() {
    // refresh links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    this.image = new Image();
    this.image.src = this.canvas.toDataURL();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate(this.degrees * Math.PI / 180);
    this.ctx.drawImage(this.image, -this.canvas.width / 2, -this.canvas.width / 2);

    this.ctx.restore();
  }

  init() {
    this.canvas = document.querySelector('.canvas__item'); // refresh links
    this.ctx = this.canvas.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');

    this.rotationButton.addEventListener('click', this.turnClockwise.bind(this));
  }
}
