import 'mongodb-stitch';
import React from 'react';
import './App.css';

export class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkins: null
    }
  }

  componentDidMount() {

  this.props.stitchClient
    .executeFunction('popularCheckins', 10)
    .then(
      checkinData => {
        this.setState({checkins: checkinData
          .map((checkin, index) => 
          <li key={index}>
            Rank: {index + 1} ,&nbsp;
            Location: {checkin.venue} ,&nbsp;
            Count: {checkin.count.toNumber()}
          </li>
        )})
      },
      error => {
        console.log(
          "Failed to fetch most popular check-ins: "
          + error)
    })
  }

 render() {
    return (
      <div>
        <h2>Most popular check-ins</h2>
        <div>
        <ul>
          { this.state.checkins }
        </ul>
        </div>
      </div>
    );
  }
}