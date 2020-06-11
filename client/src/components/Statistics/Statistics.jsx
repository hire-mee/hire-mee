import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js';

class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const pieData = {
      labels: ['On Site', 'Rejected', 'No Response'],
      datasets: [{
        data: [12.5, 12.5, 75],
        backgroundColor: ['#78c975', '#cf4a4a', '#bababa'],
        hoverBackgroundColor: ['#78c975', '#cf4a4a', '#bababa']
      }]
    };

    return (
      <div>
        <div className='stat_header'>Current Application Statistics:</div>
        <div className='stat_info'>You applied to <span className='stat_color'>{this.props.user.appliedtoday}</span> jobs on a daily average.</div>
        <div className='stat_info'>You applied to <span className='stat_color'>{Math.floor(this.props.user.appliedmonth/4)}</span> jobs on a weekly average.</div>
        <div className='stat_info'>You applied to <span className='stat_color'>{this.props.user.appliedmonth}</span> jobs this month.</div>
        <div className='stat_info'>You applied to <span className='stat_color'>{this.props.user.totalapplied}</span> jobs in total.</div>
        <div id="chart">

        </div>
        <div className="stat_pie">
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false,
              responsive:true,
              legend: {
                align: "start",
                display: true,
                position: 'right'},
                plugins: {
                  labels: {
                    render: 'value'
                  }
                },
                pieceLabel: {
                  // precision for percentage, default is 0
                  precision: 1,

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
          <p className='stat_pieInfo'>Status on <span className='stat_color'>{this.props.user.totalapplied}</span> applications.</p>
        </div>
      </div>
    )
  }
}

export default Statistics;