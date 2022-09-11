import React from 'react';
import {  Modal } from 'react-bootstrap';

const ModalOne = ({
  children,
  button = { title: 'add' },
  modal = { title: 'modal', size: 'lg' },
  callBackModalClose,
  className,
}) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <React.Fragment>
      <button className={className} onClick={handleShow}>
        {button.title}
      </button>

      <Modal
        size={modal.size}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        
        <Modal.Body>
          {children &&
            React.cloneElement(children, {
              parentHandleCloseModal: handleCloseModal,
            })}
        </Modal.Body>
        
      </Modal>
    </React.Fragment>
  );
};

export default ModalOne;
