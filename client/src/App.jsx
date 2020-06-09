import React from 'react';
import DetailedView from './components/DetailedView/DetailedView.jsx';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      psuedo: {positionTitle: "Full-Stack Web Developer",salary: 120000, loc: "Mountain View, Ca", urlLink:"www.fake.com", companyName: "Google", descr:"This is a fake job", category:"Applied", submitDate: "06/06/2020", deadLine: "06/20/2020", color: "orange" },
      desiredSalary: 100000
    }
  }


  render(){
    return (
      <div className="main">
        <DetailedView jobInfo={this.state.psuedo} desired={this.state.desiredSalary}/>
      </div>
    );
  }
}

export default App;