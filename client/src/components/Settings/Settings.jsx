import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from "react-router-dom";


class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showReset: false,
      showDelete: false,
      successfulDelete: false
    }
    this.changeReset = this.changeReset.bind(this);
    this.toggleModal = this.toggleModal.bind(this)
    this.redirectBackToSignup = this.redirectBackToSignup.bind(this);
    this.deleteAcc = this.deleteAcc.bind(this);
    this.resetJobs = this.resetJobs.bind(this);
  }

  changeReset() {
    this.setState({
      showReset: !this.state.showReset
    })
  }

  redirectBackToSignup() {
    this.setState({
      successfulDelete: !this.state.successfulDelete
    })
  }

  toggleModal(){
    this.setState({
      showDelete: !this.state.showDelete
    })
  }

  deleteAcc() {
    axios
    .delete(`/api/email/${localStorage.email}`)
    .then(() => {
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      this.toggleModal();
      this.redirectBackToSignup();
    })
    .catch(err => console.error(err));
  }

  resetJobs(id) {
    axios
    .put(`/api/userApp/${id}`, {
      // applied_today: 0,
      applied_month: 0
    })
    .then(() => {
      this.props.getData();
    })
    .catch(err => console.error(err));
  }

  render() {
    if (this.state.successfulDelete) {
      return( <Redirect to="/signup"/> )
    } else {
      return (
        <div className="module_component_container">
          <div className='stat_header'>Account Settings:</div>
          <div className='stat_info'>Reset number of applied jobs this month
            <span className='setting_reset'><Button onClick={this.changeReset}>Reset</Button></span>
            <Modal show={this.state.showReset} onHide={() => this.changeReset()}>
              <Modal.Body>
                Are you sure you want to reset the number of applied jobs this month?
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.changeReset} >Close</Button>
                <Button onClick={() => { this.changeReset(); this.resetJobs(localStorage.id); }}> Reset</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className='stat_info'>
            <div style={{marginRight:"auto"}}>Delete account</div>
          <span className='setting_delete'><Button onClick={this.toggleModal} style={{ marginLeft:"15px", backgroundColor:"#dc3545", border:"none"}}>Delete</Button></span>
          <Modal show={this.state.showDelete} onHide={() => this.toggleModal()}>
              <Modal.Body>
                Are you sure really sure you want to delete your account? There is no going back from here.
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.toggleModal} >Close</Button>
                <Button onClick={this.deleteAcc} style={{ backgroundColor:"#dc3545", border:"none"}}>DELETE</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )
    }
  }
}

export default Settings;