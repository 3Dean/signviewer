import '@google/model-viewer';
import './styles.css';

const viewer = document.querySelector('#artwork-viewer');
const message = document.querySelector('#model-message');

viewer.addEventListener('error', () => {
  message.hidden = false;
  message.textContent =
    'The model could not be loaded. Confirm that public/models/paintedpaths3dlogo.glb exists and refresh the page.';
});
