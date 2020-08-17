import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function Logout(props){
      return (
        <div>
          <Modal show={props.showLogoutModal} onHide={() => console.log('Hide')}>
            <Modal.Body>
              <br/>
              Hello {props.user.first_name}, are you sure you want to log out?
              <br/>
              <br/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.handleModal}>Close</Button>
              <Button onClick={() => {props.handleModal()}}> Log Out</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
}

export default Logout;

