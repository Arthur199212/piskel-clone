import { currentFrameIndex, setCurrentFrameIndex } from './frames';

let storage;

export default class CheckIndex {
  static check(e) {
    if (e.target.parentElement.className.indexOf('frame__unit') >= 0) {
      setCurrentFrameIndex(e.target.parentElement.children[1].textContent);
    } else if (e.target.className.indexOf('frame__unit') >= 0) {
      setCurrentFrameIndex(e.target.children[1].textContent);
    } else {
      setCurrentFrameIndex(e.target.parentElement.parentElement.children[1].textContent);
    }

    if (currentFrameIndex) {
      storage = currentFrameIndex;
      storage -= 1;
    }

    setCurrentFrameIndex(storage);

    return currentFrameIndex;
  }
}
