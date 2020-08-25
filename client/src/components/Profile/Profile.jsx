import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      first_name: '',
      last: '',
      salary: '',
      updateSuccess: false,
      profileModuleOpen: false,
      incomplete: null,
    };
    this.getUserData =  this.getUserData.bind(this)
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

  getUserData(){
    axios.get(`/api/user/${localStorage.id}`)
    .then(res => {
      this.setState({
        userData: res.data[0]
      })
    })
    .catch(err => console.error(err))
  }

  componentDidMount(){
   this.getUserData()
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
      first_name: '',
      last_name: '',
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
    let { first_name, last_name, salary} = this.state.userData

    if (first_name && last_name && salary) {
      axios
      .put(`/api/user/profileUpdate/${localStorage.id}`, {
        first_name: first_name,
        last_name: last_name,
        salary: salary
      })
      .then(() => {
        this.setState({
          updateSuccess: true,
          incomplete: null
        }, ()=> {
          document.getElementById("first_nameInputBar").value = '';
          document.getElementById("last_nameInputBar").value = '';
          document.getElementById("desiredSalaryInputBar").value = '';
          this.props.getUpdatedData(localStorage.id);
        })
      })
      .catch((err) => {
        console.error(err);
      });
    } else if (first_name && last_name) {
        axios
        .put(`/api/user/${localStorage.id}`, {
          first_name: first_name,
          last_name: last_name
        })
        .then(() => {
          this.setState({
            updateSuccess: true,
            incomplete: null
          }, ()=> {
            document.getElementById("first_nameInputBar").value = '';
            document.getElementById("last_nameInputBar").value = '';
            this.props.getUpdatedData(localStorage.id);
          })
        })
        .catch((err) => {
          console.error(err);
        });
    } else if ((!first_name && !last_name) && salary){
        axios
        .put(`/api/user/salary/${localStorage.id}`, {
          salary: salary
        })
        .then(() => {
          this.setState({
            updateSuccess: true,
            incomplete: null
          }, ()=> {
            document.getElementById("desiredSalaryInputBar").value = '';
            this.props.getUpdatedData(localStorage.id);
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
        <div className="userProfileContainer" onClick={this.launchProfileModule}>
          <div className="userAvatar">
            <img
              className="userAvatar"
              src="https://www.w3schools.com/howto/img_avatar.png"
            ></img>
          </div>
          <div className="userProfileData">{this.state.userData.first_name}</div>
        </div>
        <div>
          <Modal show={this.state.profileModuleOpen} onHide={this.closeClickHandler}>
            <Modal.Header closeButton>
              <Modal.Title>Update User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <br />
              <div>
                <form>
                  <div className="updateNameContainer">
                    <input
                      type="text"
                      className="updateNameInput"
                      name="first_name"
                      onChange={this.onChangeHandler}
                      placeholder="First Name"
                      id="first_nameInputBar"
                    />
                    <input
                      type="text"
                      className="updateNameInput"
                      name="last_name"
                      onChange={this.onChangeHandler}
                      placeholder="Last Name"
                      id="last_nameInputBar"
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