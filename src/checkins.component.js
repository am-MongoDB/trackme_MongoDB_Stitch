import { builtins } from 'mongodb-stitch';
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
    .executePipeline([
      builtins.namedPipeline('recentCheckins', {
        number: 10
      })])
    .then(
      checkinData => {
        this.setState({checkins: checkinData.result[0].map((checkin, index) => 
          <li key={index}>
            <a href={checkin.url} target="_Blank">
            {checkin.venueName}</a>
             &nbsp;( {checkin.date} )
             <br/>
             <img src={checkin.locationImg} className="mapImg" alt={"map of " + checkin.venueName}/>
          </li>
        )})
      },
      error => {
        console.log("Failed to fetch checkin data: "
          + error)
    })

    this.props.stitchClient
      .executePipeline([
        builtins.namedPipeline('friendsCheckins', {
          number: 10
        })])
      .then(
        friendData => {
          this.setState({friendsCheckins: friendData.result[0].map((friend, friendIndex) =>
            <li key={friendIndex}>
            <strong>{friend._id}</strong>
            <ul>
            {friend.checkins.map((checkin) =>
              <li>
                <a href={checkin.url} target="_Blank">
                  {checkin.venueName}</a>
                  &nbsp;( {checkin.date} )
                  <br/>
                  <img src={checkin.locationImg} className="mapImg" alt={"map of " + checkin.venueName}/>
              </li>
            )}
            </ul>
            </li>
            )
          })
        },
        error => {
          console.log("Failed to fetch friends' data: "
            + error)
      })
  }

  displayCheckin(checkin) {
    console.log(checkin.venueName);
    return ("<li>Venue: " + checkin.venueName + "</li>")
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