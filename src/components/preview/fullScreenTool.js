export default class FullScreenTool {
  constructor() {
    this.previewItem = document.querySelector('.preview__item');
    this.fullScreenButton = document.querySelector('#fullScreen');
  }

  toggleFullscreen() {
    this.fullScreenButton.style.display = 'none';

    if (!document.fullscreenElement) {
      this.previewItem.requestFullscreen().catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  init() {
    this.fullScreenButton.addEventListener('click', this.toggleFullscreen.bind(this));
  }
}
