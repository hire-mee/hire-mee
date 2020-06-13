import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  deleteAcc(id) {
    axios
    .delete(`/api/users/${id}`)
    .then(() => {

    })
  }

  render() {
    return (
      <div>
        <div className='stat_header'>Account Settings:</div>
        <div className='stat_info'>Reset number of total applied jobs
        <span><Button>Hello</Button></span>
        </div>
        <div className='stat_info'>Delete account
        <span><Button>Goodbye</Button></span>
        </div>
      </div>
    )
  }
}

export default Settings;