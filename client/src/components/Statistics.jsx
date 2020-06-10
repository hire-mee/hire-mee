import React from 'react';
import { Pie } from 'react-chartjs-2';

class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const pieData = {
      labels: [
        'Rejected',
        'On Site',
        'No Response'
      ],
      datasets: [{
        // need number of rejected, on site and no response
        data: [12.5, 12.5, 75],
        backgroundColor: [
        '#cf4a4a',
        '#78c975',
        '#bababa'
        ],
        hoverBackgroundColor: [
        '#cf4a4a',
        '#78c975',
        '#bababa'
        ]
      }]
    };

    return (
      <div>
        <div>Current Application Statistics:</div>
        <div>You applied to <span className='stat_color'>{this.props.user.appliedtoday}</span> jobs on a daily average.</div>
        <div>You applied to <span className='stat_color'>{this.props.user.appliedmonth/4}</span> jobs on a weekly average.</div>
        <div>You applied to <span className='stat_color'>{this.props.user.appliedmonth}</span> jobs this month.</div>
        <div>You applied to <span className='stat_color'>{this.props.user.totalapplied}</span> jobs in total.</div>
        <div id="chart">

        </div>
        <div className="stats-pie">
          <Pie
            data={pieData}
            options={{ maintainAspectRatio:false,
              responsive:true, legend: {align: "start", display: true, position: 'right'}}}
          />
          Status on <span className='stat_color'>{this.props.user.totalapplied}</span> applications.
        </div>
      </div>
    )
  }
}

export default Statistics;