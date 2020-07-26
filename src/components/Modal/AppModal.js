import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AppModal = (props) => {
	const { title, show, onClose, onSave, footerOne, footerTwo } = props;
	return (
		<>
			<Modal show={show} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.children}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onClose}>
						{footerOne}
          </Button>
					<Button variant="primary" onClick={onSave}>
						{footerTwo}
          </Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AppModal;