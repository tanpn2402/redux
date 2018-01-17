import React from 'react';
import { connect } from 'react-redux'

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
     componentWillUnmount() {
    clearInterval(this.timerID);
  }
      tick() {
    this.setState({
      date: new Date()
    });
  }
render() {
    return (
      <div className="time_place">
       {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}


export default (Clock)