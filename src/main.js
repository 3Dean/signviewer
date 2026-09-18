import { ModelViewerElement } from '@google/model-viewer';
import './styles.css';

// Use the locally hosted decoder for KHR_draco_mesh_compression models.
ModelViewerElement.dracoDecoderLocation = '/draco/';

const viewer = document.querySelector('#artwork-viewer');
const message = document.querySelector('#model-message');
const viewerActions = document.querySelector('#viewer-actions');
const arButton = document.querySelector('#ar-button');

function updateArAvailability() {
  viewerActions.hidden = !viewer.canActivateAR;
}

viewer.addEventListener('load', updateArAvailability);
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
  message.hidden = false;
  message.textContent =
    'The model could not be loaded. Confirm that the GLB exists in public/models and refresh the page.';
});
