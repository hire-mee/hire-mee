import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {/* <Button> Open Modal</Button> */}
        <Modal show={this.props.show} onHide={() => console.log('Hide')}>
          {/* <Modal.Header>Modal Head Part</Modal.Header> */}
          <Modal.Body>
            <br/>
            Hello {this.props.user.firstname}, are you sure you want to log out?
            <br/>
            <br/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleModal} >Close</Button>
            <Button onClick={() => { this.props.logFunction(); this.props.handleModal(); }}> Log Out</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Logout;