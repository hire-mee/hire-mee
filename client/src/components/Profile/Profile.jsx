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
      profileModuleOpen: false
    };
    this.profileChangeSubmit = this.profileChangeSubmit.bind(this);
    this.launchProfileModule = this.launchProfileModule.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.closeClickHandler = this.closeClickHandler.bind(this);
    // this.incompleteFormHandler = this.incompleteFormHandler.bind(this);
    this.profileUpdateSubmitSuccess = this.profileUpdateSubmitSuccess.bind(this);
  }

  launchProfileModule() {
    console.log('clicked');
    this.setState({
      profileModuleOpen: !this.state.profileModuleOpen
    });
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
      profileModuleOpen: !this.state.profileModuleOpen
    });
  }

  // incompleteFormHandler() {
  //   if (this.state.incomplete === true) {
  //     return (
  //       <div className="nameChangeConfirmation">
  //         <h4>Please complete the form</h4>
  //       </div>
  //     );
  //   }
  // }

  profileChangeSubmit() {
    if (this.state.firstName && this.state.lastName && this.state.salary) {
      // UPDATE ALL THREE ITEMS
    } else if (this.state.firstName && this.state.lastName) {
        axios
        .put(`/api/user/${this.props.userData.id}`, {
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
        .then(() => {
          // DO STUFF HERE
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((!this.state.firstName && !this.state.lastName) && this.state.salary){
        axios
        .put(`/api/user/salary/${this.props.userData.id}`, {
          salary: this.state.salary
        })
        .then(() => {
          // DO STUFF HERE
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
              <br />
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

// import React from 'react';
// import axios from 'axios';
// import { Button, Modal } from 'react-bootstrap';

// class Profile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       changeName: false,
//       firstName: '',
//       lastName: '',
//       nameChangeSubmitted: false,
//       incomplete: false
//     };
//     this.onClickHandler = this.onClickHandler.bind(this);
//     this.onChangeHandler = this.onChangeHandler.bind(this);
//     this.nameChangeSubmit = this.nameChangeSubmit.bind(this);
//     this.closeClickHandler = this.closeClickHandler.bind(this);
//     this.incompleteFormHandler = this.incompleteFormHandler.bind(this);
//     this.nameChangeSubmitConfimation = this.nameChangeSubmitConfimation.bind(
//       this
//     );
//   }

//   onClickHandler() {
//     console.log('clicked');
//     this.setState({
//       changeName: !this.state.changeName
//     });
//   }

//   onChangeHandler(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }

//   nameChangeSubmitConfimation() {
//     if (this.state.nameChangeSubmitted === true) {
//       return (
//         <div className="nameChangeConfirmation">
//           <h4>Update has been submitted!</h4>
//         </div>
//       );
//     }
//   }

//   closeClickHandler() {
//     this.setState({
//       changeName: false,
//       nameChangeSubmitted: false,
//       incomplete: false,
//       firstName: '',
//       lastName: ''
//     });
//   }

//   incompleteFormHandler() {
//     if (this.state.incomplete === true) {
//       return (
//         <div className="nameChangeConfirmation">
//           <h4>Please complete the form</h4>
//         </div>
//       );
//     }
//   }

//   nameChangeSubmit() {
//     if (this.state.firstName.length === 0 || this.state.lastName.length === 0) {
//       this.setState({
//         incomplete: true
//       });
//     } else {
//       if (this.state.incomplete === true) {
//         this.setState({
//           incomplete: false
//         });
//       }
//       this.setState({
//         nameChangeSubmitted: !this.state.nameChangeSubmitted
//       });
//       axios
//         .put(`/api/user/${this.props.userData.id}`, {
//           firstName: this.state.firstName,
//           lastName: this.state.lastName
//         })
//         .then(() => {
//           this.setState({
//             nameChangeSubmitted: !this.state.nameChangeSubmitted
//           });
//         })
//         .then(() => {
//           this.setState({
//             changeName: !this.state.changeName
//           });
//         })
//         .then(() => {
//           this.props.getUpdatedData(this.props.userData.id);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }

//   render() {
//     // console.log('profile area props', this.props);
//     // console.log('profile area', this.props);
//     return (
//       <div>
//         <div className="userProfileContainer">
//           <div className="userAvatar">
//             <img
//               onClick={this.onClickHandler}
//               className="userAvatar"
//               src="https://www.w3schools.com/howto/img_avatar.png"
//             ></img>
//           </div>
//           <div className="userProfileData">{this.props.userData.firstname}</div>
//         </div>
//         <div>
//           <Modal show={this.state.changeName} onHide={this.closeClickHandler}>
//             <Modal.Header closeButton>
//               <Modal.Title>Update Name</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <br />
//               <div>
//                 <form>
//                   <div className="updateNameContainer">
//                     <input
//                       type="text"
//                       className="updateNameInput"
//                       name="firstName"
//                       onChange={this.onChangeHandler}
//                       placeholder="First Name"
//                       required
//                     />
//                     <input
//                       type="text"
//                       className="updateNameInput"
//                       name="lastName"
//                       onChange={this.onChangeHandler}
//                       placeholder="Last Name"
//                       required
//                     />
//                   </div>
//                 </form>
//               </div>
//               {this.nameChangeSubmitConfimation()}
//               {this.incompleteFormHandler()}
//               <br />
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={this.closeClickHandler}>Close</Button>
//               <Button onClick={this.nameChangeSubmit}>Submit</Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>
//     );
//   }
// }

// export default Profile;