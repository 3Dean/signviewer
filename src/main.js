import { ModelViewerElement } from '@google/model-viewer';
import './styles.css';

// Use the locally hosted decoder for KHR_draco_mesh_compression models.
ModelViewerElement.dracoDecoderLocation = '/draco/';

const viewer = document.querySelector('#artwork-viewer');
const message = document.querySelector('#model-message');
const materialSelect = document.querySelector('#material-select');

let originalFinish;

function applySelectedFinish() {
  const material = viewer.model?.materials?.[0];

  if (!material || !originalFinish) {
    return;
  }

  const pbr = material.pbrMetallicRoughness;

  if (materialSelect.value === 'glossy') {
    pbr.setBaseColorFactor('#786A64');
    pbr.setMetallicFactor(0.6);
    pbr.setRoughnessFactor(0.48);
    return;
  }

  pbr.setBaseColorFactor(originalFinish.baseColorFactor);
  pbr.setMetallicFactor(originalFinish.metallicFactor);
  pbr.setRoughnessFactor(originalFinish.roughnessFactor);
}

viewer.addEventListener('load', () => {
  const pbr = viewer.model?.materials?.[0]?.pbrMetallicRoughness;

  if (!pbr) {
    return;
  }

  originalFinish = {
    baseColorFactor: [...pbr.baseColorFactor],
    metallicFactor: pbr.metallicFactor,
    roughnessFactor: pbr.roughnessFactor,
  };

  materialSelect.disabled = false;
  applySelectedFinish();
});

materialSelect.addEventListener('change', applySelectedFinish);

viewer.addEventListener('error', () => {
  message.hidden = false;
  message.textContent =
    'The model could not be loaded. Confirm that public/models/logocompressed.glb exists and refresh the page.';
});
