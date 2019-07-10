export default class InvertColors {
  static invert() {
    const canvas = document.querySelector('.canvas__item');
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const { data } = imageData;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    ctx.putImageData(imageData, 0, 0);
  }

  init() {
    const invertButton = document.querySelector('.invert__button');

    invertButton.addEventListener('click', InvertColors.invert.bind(this));
  }
}
