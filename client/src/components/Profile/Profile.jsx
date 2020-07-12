import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeName: false,
      firstName: '',
      lastName: '',
      nameChangeSubmitted: false,
      incomplete: false
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.nameChangeSubmit = this.nameChangeSubmit.bind(this);
    this.closeClickHandler = this.closeClickHandler.bind(this);
    this.incompleteFormHandler = this.incompleteFormHandler.bind(this);
    this.nameChangeSubmitConfimation = this.nameChangeSubmitConfimation.bind(
      this
    );
  }

  onClickHandler() {
    this.setState({
      changeName: !this.state.changeName
    });
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  nameChangeSubmitConfimation() {
    if (this.state.nameChangeSubmitted === true) {
      return (
        <div className="nameChangeConfirmation">
          <h4>Update has been submitted!</h4>
        </div>
      );
    }
  }

  closeClickHandler() {
    this.setState({
      changeName: false,
      nameChangeSubmitted: false,
      incomplete: false,
      firstName: '',
      lastName: ''
    });
  }

  incompleteFormHandler() {
    if (this.state.incomplete === true) {
      return (
        <div className="nameChangeConfirmation">
          <h4>Please complete the form</h4>
        </div>
      );
    }
  }

  nameChangeSubmit() {
    if (this.state.firstName.length === 0 || this.state.lastName.length === 0) {
      this.setState({
        incomplete: true
      });
    } else {
      if (this.state.incomplete === true) {
        this.setState({
          incomplete: false
        });
      }
      this.setState({
        nameChangeSubmitted: !this.state.nameChangeSubmitted
      });
      axios
        .put(`/api/user/${this.props.userData.id}`, {
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
        .then(() => {
          this.setState({
            nameChangeSubmitted: !this.state.nameChangeSubmitted
          });
        })
        .then(() => {
          this.setState({
            changeName: !this.state.changeName
          });
        })
        .then(() => {
          this.props.getUpdatedData(this.props.userData.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        <div className="userProfileContainer">
          <div className="userAvatar">
            <img
              onClick={this.onClickHandler}
              className="userAvatar"
              src="https://www.w3schools.com/howto/img_avatar.png"
            ></img>
          </div>
          <div className="userProfileData">{this.props.userData.firstname}</div>
        </div>
        <div>
          <Modal show={this.state.changeName} onHide={this.closeClickHandler}>
            <Modal.Header closeButton>
              <Modal.Title>Update Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <br />
              <div>
                <form>
                  <div className="updateNameContainer">
                    <input
                      type="text"
                      className="updateNameInput"
                      name="firstName"
                      onChange={this.onChangeHandler}
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      className="updateNameInput"
                      name="lastName"
                      onChange={this.onChangeHandler}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </form>
              </div>
              {this.nameChangeSubmitConfimation()}
              {this.incompleteFormHandler()}
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeClickHandler}>Close</Button>
              <Button onClick={this.nameChangeSubmit}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Profile;
