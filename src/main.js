import { ModelViewerElement } from '@google/model-viewer';
import './styles.css';

// Use the locally hosted decoder for KHR_draco_mesh_compression models.
ModelViewerElement.dracoDecoderLocation = '/draco/';

const viewer = document.querySelector('#artwork-viewer');
const message = document.querySelector('#model-message');

viewer.addEventListener('error', () => {
  message.hidden = false;
  message.textContent =
    'The model could not be loaded. Confirm that public/models/logocompressed.glb exists and refresh the page.';
});
