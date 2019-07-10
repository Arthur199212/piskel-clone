/* eslint-disable operator-linebreak */
import CloneCanvas from './cloneCanvas';

describe('CloneCanvas.clone', () => {
  it('Should be instance of Function', () => {
    expect(CloneCanvas.clone).toBeInstanceOf(Function);
  });

  it('If we don\'t give a canvas to CloneCanvas.clone it returns null', () => {
    expect(CloneCanvas.clone()).toEqual(null);
  });
});
