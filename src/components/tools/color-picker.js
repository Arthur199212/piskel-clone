// That color picker is for getting Primary/Secondary colors
export default class ColorPicker {
  constructor() {
    this.switchColorButton = document.querySelector('#switch-colors');
    this.primaryColor = document.querySelector('#primary-color');
    this.secondaryColor = document.querySelector('#secondary-color');
  }

  switchColors() {
    const savedPrimaryColor = this.primaryColor.value;

    this.primaryColor.value = this.secondaryColor.value;
    this.secondaryColor.value = savedPrimaryColor;
  }

  init() {
    this.switchColorButton.addEventListener('click', this.switchColors.bind(this));
  }
}
