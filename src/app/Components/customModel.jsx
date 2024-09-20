// components/Modal.js
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // For accessibility

const CustomModal = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Example Modal"
    className="modal"
    overlayClassName="overlay"
  >
    <h2 className='text-black'>Welcome!</h2>
    <p>Please log in to continue.</p>
    <button onClick={onRequestClose}>Close</button>
  </Modal>
);

export default CustomModal;
