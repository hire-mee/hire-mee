import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showReset: false,
      showDelete: false
    }
    this.changeReset = this.changeReset.bind(this);
    this.changeDelete = this.changeDelete.bind(this);
    this.deleteAcc = this.deleteAcc.bind(this);
    this.resetJobs = this.resetJobs.bind(this);
  }

  changeReset() {
    this.setState({
      showReset: !this.state.showReset
    })
  }

  changeDelete() {
    this.setState({
      showDelete: !this.state.showDelete
    })
  }

  deleteAcc(id) {
    axios
    .delete(`/api/users/${id}`)
    .then(() => {
      this.props.getData();
      console.log('DELETED ACCOUNT')
    })
    .catch(err => console.error(err));
  }

  resetJobs(id) {
    axios
    .put(`/api/user/${id}`, {
      appliedToday: 0,
      appliedMonth: 0
    })
    .then(() => {
      this.props.getData();
    })
    .catch(err => console.error(err));
  }

  render() {
    console.log(`SHOWRESET: `, this.state.showReset);
    return (
      <div>
        <div className='stat_header'>Account Settings:</div>
        <div className='stat_info'>Reset number of applied jobs this month
          <span><Button onClick={this.changeReset}>Reset</Button></span>
          <Modal show={this.state.showReset} onHide={() => console.log('Hide')}>
            {/* <Modal.Header>Modal Head Part</Modal.Header> */}
            <Modal.Body>
              Are you sure you want to reset the number of applied jobs this month?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.changeReset} >Close</Button>
              <Button onClick={() => { this.changeReset(); this.resetJobs(this.props.user.id); }}> Reset</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className='stat_info'>Delete account
        <span><Button onClick={this.changeDelete}>Delete</Button></span>
        <Modal show={this.state.showDelete} onHide={() => console.log('Hide')}>
            {/* <Modal.Header>Modal Head Part</Modal.Header> */}
            <Modal.Body>
              Are you sure really sure you want to delete your account? There is no going back from here.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.changeDelete} >Close</Button>
              {/* <Button onClick={() => { this.deleteAcc(this.props.user.id); this.props.logFunction(); }}> DELETE</Button> */}
              <Button onClick={() => { this.props.logFunction(); }}> DELETE</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Settings;