import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js';
import axios from 'axios';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_data: [],
      user_app_data: [],
      app_on_site_count: 0,
      app_rejected_count: 0,
      app_no_response_count: 0
    }
    this.getDataForPieChart = this.getDataForPieChart.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.applicationsPieChartCount = this.applicationsPieChartCount.bind(this);
  }

  componentDidMount() {
    this.getDataForPieChart()
  }

  applicationsPieChartCount() {
    for (let i = 0; i < this.state.user_app_data.length; i++) {
      let current = this.state.user_app_data[i]
      if (current.category == "interview") {
        this.setState({ app_on_site_count: this.state.app_on_site_count += 1 })
      } else if (current.category == "rejected") {
        this.setState({ app_rejected_count: this.state.app_rejected_count += 1 })
      } else if (current.category == "applied") {
        this.setState({ app_no_response_count: this.state.app_no_response_count += 1 })
      }
    }
    this.setState({
      total_applied: this.state.user_app_data.length
    }, () => this.getUserData())
  }

  getUserData(){
    axios.get(`/api/user/${localStorage.id}`)
    .then(results => this.setState({
      user_data: results.data[0]
    }))
    .catch(err => console.error(err))
  }

  getDataForPieChart() {
    axios.get(`/api/applications/${localStorage.id}`)
      .then((results) => {
        this.setState({
          user_app_data: results.data
        }, () => this.applicationsPieChartCount())
      })
      .catch((err) => console.error('Error Getting Applications data', err));
  }

  render() {
    if (!this.state.user_app_data.length) {
      return (
        <div id="emptyStatisticsMessage">
          Submit applications to see your statistics here!
        </div>
      );
    } else {
      const pieData = {
        labels: ['On Site', 'Rejected', 'No Response'],
        datasets: [{
          data: [this.state.app_on_site_count, this.state.app_rejected_count, this.state.app_no_response_count],
          backgroundColor: ['#78c975', '#cf4a4a', '#bababa'],
          hoverBackgroundColor: ['#78c975', '#cf4a4a', '#bababa']
        }]
      };
  
      return (
        <div className="module_component_container">
          <div className='stat_header'>Current Application Statistics:</div>
          <div className='stat_info'>You applied to <span className='stat_color'>{this.state.user_data.applied_today}</span> jobs on a daily average.</div>
          <div className='stat_info'>You applied to <span className='stat_color'>{Math.floor(this.state.user_data.applied_month / 4)}</span> jobs on a weekly average.</div>
          <div className='stat_info'>You applied to <span className='stat_color'>{this.state.user_data.applied_month}</span> jobs this month.</div>
          <div className='stat_info'>You applied to <span className='stat_color'>{this.state.user_data.total_applied}</span> jobs in total.</div>
          <div id="chart">
  
          </div>
          <div className="stat_pie">
            <Pie
              data={pieData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                  align: "start",
                  display: true,
                  position: 'right'
                },
                plugins: {
                  labels: {
                    render: 'value'
                  }
                },
                pieceLabel: {
                  // precision for percentage, default is 0
                  precision: 0,
  
                  // font size, default is defaultFontSize
                  fontSize: 16,
  
                  // font color, default is '#fff'
                  fontColor: '#fff',
  
                  // font style, default is defaultFontStyle
                  fontStyle: 'bold',
  
                  // font family, default is defaultFontFamily
                  fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                }
              }}
            />
            <p className='stat_pieInfo'>Status on <span className='stat_color'>{this.state.total_applied}</span> applications.</p>
          </div>
        </div>
      )
    }
  }
}