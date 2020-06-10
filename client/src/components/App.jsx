import React from 'react';
import axios from 'axios';

import Statistics from './Statistics.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: '',
      logged: false,
      page: 'Jobs',
      users: '',
      currentUser: ''
    }
    // this.renderPage = this.renderPage.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
    .get('/api/users')
    .then(data => {
      this.setState({
        users: data.data,
        currentUser: data.data[0]
      })
    })
    .catch(err => console.error(err))
  }

  render() {
    console.log(`Users: `, this.state.currentUser)
    return (
      <div className='main'>
        {/* <div className='navbar'>
          <div className='title'>Hire-Mee</div>

          <div className='dashboard'>
            <div className='applications'>Applications</div>
            <div className='statistics'>Statistics</div>
            <div className='leaderboard'>Leaderboard</div>
            <div className='map'>Map</div>
            <div className='friends'>Friends</div>
          </div>
          <div className='account'>
            <div className='settings'>Settings</div>
            <div className='pause'>Pause</div>
            <div className='resetWeek'>Reset Week</div>
            <div className='logout'>Logout</div>
          </div>
        </div> */}
        <div className='category'>
          <Statistics user={this.state.currentUser}/>
        </div>
      </div>
    )
  }
}

export default App;