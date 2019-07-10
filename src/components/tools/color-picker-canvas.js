/* eslint-disable no-bitwise */
export default class ColorPickerCanvas {
  constructor() {
    this.canvasBackground = document.querySelector('.canvas__background');
    this.primaryColor = document.querySelector('#primary-color');
    this.secondaryColor = document.querySelector('#secondary-color');
  }

  static canselDefaultRightClich(e) {
    e.preventDefault();
  }

  static rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  pickColor(e) {
    const canvas = document.querySelector('.canvas__item');
    const ctx = canvas.getContext('2d');
    const x = e.layerX;
    const y = e.layerY;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const { data } = pixel;
    const rgb = ColorPickerCanvas.rgbToHex(data[0], data[1], data[2]);

    // Define what kind of button pressed -> set selected color
    if (e.button === 0) {
      this.primaryColor.value = rgb;
    } else if (e.button === 2) {
      this.secondaryColor.value = rgb;
    }
  }

  init() {
    this.canvasBackground = document.querySelector('.canvas__background');

    this.canvasBackground.addEventListener('mousedown', this.pickColor.bind(this));

    // Prevent default opening of contextmenu
    this.canvasBackground.addEventListener('contextmenu', ColorPickerCanvas.canselDefaultRightClich.bind(this));

    // Custom cursor
    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/dropper.png\') 0 16, auto';
  }
}
