export default class Flip {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.image = null;
    this.canvasBackground = document.querySelector('.canvas__background');
    this.flipButton = document.querySelector('.flip__button');
  }

  flip() {
    // Refresh links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    this.image = new Image();
    this.image.src = this.canvas.toDataURL();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.image, -this.canvas.width, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  init() {
    // Refresh links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');

    this.flipButton.addEventListener('click', this.flip.bind(this));
  }
}
