import Canvas from './screens/canvas/canvas';
import './screens/canvas/style.css';
import './components/tools/picker-style.css';
import './components/frames/frames.css';


function startApp() {
  const canvas = new Canvas();
  canvas.init();
}

window.onload = startApp();
