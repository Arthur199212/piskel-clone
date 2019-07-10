/* eslint-disable operator-linebreak */
import DrawNewFrame from './drawNewFrame';

describe('DrawNewFrame.init', () => {
  it('Should be instance of Function', () => {
    // Set up our document body
    document.body.innerHTML =
    '<div class="frames__wrapper">' +
      '<div class="frame__background">' +
        '<div class="frame__unit">' +
          '<div class="frame__item-button copy hide-button"><i class="fas fa-copy frame-button-icon"></i></div>' +
          '<div class="frame__item-button index">1</div>' +
          '<div class="frame__item-button trash hide-button"><i class="fas fa-trash-alt frame-button-icon"></i></div>' +
        '</div>' +
      '</div>' +
    '</div >';

    const drawNewFrame = new DrawNewFrame();
    drawNewFrame.emptyFrame = document.querySelector('.frame__background');
    drawNewFrame.frameWrapper = document.querySelector('.frames__wrapper');
    drawNewFrame.addFrameButton = document.querySelector('.frames__add-frame-button');
    expect(drawNewFrame.init).toBeInstanceOf(Function);
  });

  it('Should create a new frame__unit', () => {
    // Set up our document body
    document.body.innerHTML =
    '<div class="frames__wrapper">' +
      '<div class="frame__background">' +
        '<div class="frame__unit">' +
          '<div class="frame__item-button copy hide-button"><i class="fas fa-copy frame-button-icon"></i></div>' +
          '<div class="frame__item-button index">1</div>' +
          '<div class="frame__item-button trash hide-button"><i class="fas fa-trash-alt frame-button-icon"></i></div>' +
        '</div>' +
      '</div>' +
    '</div >';

    const drawNewFrame = new DrawNewFrame();
    drawNewFrame.emptyFrame = document.querySelector('.frame__background');
    drawNewFrame.frameWrapper = document.querySelector('.frames__wrapper');
    drawNewFrame.addFrameButton = document.querySelector('.frames__add-frame-button');
    drawNewFrame.init(2);
    expect(drawNewFrame.frameWrapper.children[1].children[0].className).toEqual('frame__unit');
  });

  it('Should create a new frame__unit with correct index', () => {
    // Set up our document body
    document.body.innerHTML =
    '<div class="frames__wrapper">' +
      '<div class="frame__background">' +
        '<div class="frame__unit">' +
          '<div class="frame__item-button copy hide-button"><i class="fas fa-copy frame-button-icon"></i></div>' +
          '<div class="frame__item-button index">1</div>' +
          '<div class="frame__item-button trash hide-button"><i class="fas fa-trash-alt frame-button-icon"></i></div>' +
        '</div>' +
      '</div>' +
    '</div >';

    const drawNewFrame = new DrawNewFrame();
    drawNewFrame.emptyFrame = document.querySelector('.frame__background');
    drawNewFrame.frameWrapper = document.querySelector('.frames__wrapper');
    drawNewFrame.addFrameButton = document.querySelector('.frames__add-frame-button');
    drawNewFrame.init(2);
    expect(drawNewFrame.frameWrapper.children[1].children[0].children[1].textContent).toEqual('2');
  });
});
