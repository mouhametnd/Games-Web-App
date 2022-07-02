import { createPortal } from 'react-dom';

// We've created a portal for the modal.
const PortalModal = ({ children }) => createPortal(children, document.getElementById('modal-root'));
export default PortalModal;
