import 'mongodb-stitch';
import React from 'react';
import './App.css';

export class Checkins extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkins: null,
      friendsCheckins: null
    }
  }

  componentDidMount() {

  this.props.stitchClient
    .executeFunction('recentCheckins', 10)
    .then(
      checkinData => {
        this.setState({checkins: checkinData
          .map((checkin, index) => 
          <li key={index}>
            <a href={checkin.url} 
              target="_Blank">
            {checkin.venueName}</a> &nbsp;
            ( {checkin.date} )
             <br/>
             <img src={checkin.locationImg} 
              className="mapImg" 
              alt={"map of " + 
                checkin.venueName}/>
          </li>
        )})
      },
      error => {
        console.log(
          "Failed to fetch checkin data: "
          + error)
    })

    // This function can be run asynchronously
    // with the previous one as we don't care
    // which completes first
    this.props.stitchClient
      .executeFunction('friendsCheckins', 5)
      .then(
        friendData => {
          this.setState({friendsCheckins: 
            friendData
            .map((friend, friendIndex) =>
            <li key={friendIndex}>
            <strong>{friend._id}</strong>
            <ul>
            {friend.checkins.map((checkin, checkinIndex) =>
              <li key={checkinIndex}>
                <a href={checkin.url} 
                  target="_Blank">
                  {checkin.venueName}</a>
                  &nbsp;( {checkin.date} )
                  <br/>
                  <img src={
                    checkin.locationImg} 
                    className="mapImg" 
                    alt={"map of " 
                      + checkin.venueName}/>
              </li>
            )}
            </ul>
            </li>
            )
          })
        },
        error => {
          console.log(
            "Failed to fetch friends' data: "
            + error)
      })
  }

 render() {
    return (
      <div>
        <h2>My latest checkins</h2>
        <div>
        <ul>
          { this.state.checkins }
        </ul>
        <h2>My friends' checkins</h2>
        <ul>
          { this.state.friendsCheckins }
        </ul>
        </div>
      </div>
    );
  }
}