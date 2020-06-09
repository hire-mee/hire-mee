import React from 'react';
import DetailedView from './components/DetailedView/DetailedView.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div className="main">
        <DetailedView />
      </div>
    );
  }
}

export default App;