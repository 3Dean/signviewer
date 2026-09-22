import { ModelViewerElement } from '@google/model-viewer';
import './styles.css';

// Use the locally hosted decoder for KHR_draco_mesh_compression models.
ModelViewerElement.dracoDecoderLocation = '/draco/';

const viewer = document.querySelector('#artwork-viewer');
const message = document.querySelector('#model-message');
const viewerActions = document.querySelector('#viewer-actions');
const arButton = document.querySelector('#ar-button');
const modelSelect = document.querySelector('#model-select');

function updateArAvailability() {
  viewerActions.hidden = !viewer.loaded || !viewer.canActivateAR;
}

modelSelect.addEventListener('change', () => {
  message.hidden = true;
  message.textContent = '';
  viewerActions.hidden = true;
  viewer.alt = `Interactive three-dimensional artwork — ${modelSelect.selectedOptions[0].textContent.toLowerCase()} finish`;
  viewer.src = modelSelect.value;
});

viewer.addEventListener('load', () => {
  message.hidden = true;
  message.textContent = '';
  updateArAvailability();
});
viewer.addEventListener('ar-status', updateArAvailability);

arButton.addEventListener('click', async () => {
  try {
    await viewer.activateAR();
  } catch {
    message.hidden = false;
    message.textContent = 'AR could not be started on this device.';
  }
});

viewer.addEventListener('error', () => {
  viewerActions.hidden = true;
  message.hidden = false;
  message.textContent =
    'This finish could not be loaded. Choose another finish or refresh the page to try again.';
});
