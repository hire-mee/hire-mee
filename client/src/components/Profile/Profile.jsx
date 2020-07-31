import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      salary: '',
      updateSuccess: false,
      profileModuleOpen: false,
      incomplete: null,
    };
    this.profileChangeSubmit = this.profileChangeSubmit.bind(this);
    this.launchProfileModule = this.launchProfileModule.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.closeClickHandler = this.closeClickHandler.bind(this);
    this.incompleteFormHandler = this.incompleteFormHandler.bind(this);
    this.profileUpdateSubmitSuccess = this.profileUpdateSubmitSuccess.bind(this);
  }

  launchProfileModule() {
    this.setState({
      profileModuleOpen: !this.state.profileModuleOpen
    });
  }

  componentDidMount(){
   
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  profileUpdateSubmitSuccess() {
    if (this.state.updateSuccess) {
        return (
        <div className="nameChangeConfirmation">
          <h4>Update has been submitted!</h4>
        </div>
        );
    }
  }

  closeClickHandler() {
    this.setState({
      firstName: '',
      lastName: '',
      salary: '',
      updateSuccess: false,
      incomplete: null,
      numberTypeError: false,
      profileModuleOpen: !this.state.profileModuleOpen
    });
  }

  incompleteFormHandler() {
    if (this.state.incomplete) {
      return (
        <div className="nameChangeConfirmation">
          <h4>Please complete at least one of the two changes</h4>
        </div>
      );
    }
  }


  profileChangeSubmit() {
    if (this.state.firstName && this.state.lastName && this.state.salary) {
      axios
      .put(`/api/user/profileUpdate/${this.props.userData.id}`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        salary: this.state.salary
      })
      .then(() => {
        this.setState({
          updateSuccess: true,
          incomplete: null
        }, ()=> {
          document.getElementById("firstNameInputBar").value = '';
          document.getElementById("lastNameInputBar").value = '';
          document.getElementById("desiredSalaryInputBar").value = '';
          this.props.getUpdatedData(this.props.userData.id);
        })
      })
      .catch((err) => {
        console.error(err);
      });
    } else if (this.state.firstName && this.state.lastName) {
        axios
        .put(`/api/user/${this.props.userData.id}`, {
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
        .then(() => {
          this.setState({
            updateSuccess: true,
            incomplete: null
          }, ()=> {
            document.getElementById("firstNameInputBar").value = '';
            document.getElementById("lastNameInputBar").value = '';
            this.props.getUpdatedData(this.props.userData.id);
          })
        })
        .catch((err) => {
          console.error(err);
        });
    } else if ((!this.state.firstName && !this.state.lastName) && this.state.salary){
        axios
        .put(`/api/user/salary/${this.props.userData.id}`, {
          salary: this.state.salary
        })
        .then(() => {
          this.setState({
            updateSuccess: true,
            incomplete: null
          }, ()=> {
            document.getElementById("desiredSalaryInputBar").value = '';
            this.props.getUpdatedData(this.props.userData.id);
          })
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.setState({incomplete: true})
    }
  }

  render() {
    return (
      <div>
        <div className="userProfileContainer">
          <div className="userAvatar">
            <img
              onClick={this.launchProfileModule}
              className="userAvatar"
              src="https://www.w3schools.com/howto/img_avatar.png"
            ></img>
          </div>
          <div className="userProfileData">{this.props.userData.firstname}</div>
        </div>
        <div>
          <Modal show={this.state.profileModuleOpen} onHide={this.closeClickHandler}>
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
                      id="firstNameInputBar"
                    />
                    <input
                      type="text"
                      className="updateNameInput"
                      name="lastName"
                      onChange={this.onChangeHandler}
                      placeholder="Last Name"
                      id="lastNameInputBar"
                    />
                     <input
                      type="number"
                      className="updateNameInput"
                      name="salary"
                      onChange={this.onChangeHandler}
                      placeholder="Desired Salary"
                      id="desiredSalaryInputBar"
                    />
                  </div>
                </form>
              </div>
              <br />
              {this.profileUpdateSubmitSuccess()}
              {this.incompleteFormHandler()}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeClickHandler}>Close</Button>
              <Button onClick={this.profileChangeSubmit}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Profile;