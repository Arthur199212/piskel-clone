export default class CloneCanvas {
  static clone(oldCanvas) {
    if (oldCanvas) {
      // Create a new canvas
      const newCanvas = document.createElement('canvas');
      const context = newCanvas.getContext('2d');

      newCanvas.setAttribute('class', 'canvas__item');

      // Set dimensions
      newCanvas.width = oldCanvas.width;
      newCanvas.height = oldCanvas.height;

      // Apply the old canvas to the new one
      context.drawImage(oldCanvas, 0, 0);

      return newCanvas;
    }

    return null;
  }
}
