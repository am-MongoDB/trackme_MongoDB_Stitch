import React, { Component } from 'react';
import './App.css';
import { StitchClient } from 'mongodb-stitch';
import { Login } from './login.component';
import { Checkins } from 
                    './checkins.component';
import { AddFriend } from 
                    './addfriend.component';
import { TextCheckin } from 
                    './text.checkin.component';
import config from './config';


class Trackme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.appId = config.appId;
    if (process.env.APP_ID) {
      this.appId = process.env.APP_ID;
    }

    let options = {};
    this.stitchClient = new StitchClient(
      this.appId, options);
    this.db = 
      this.stitchClient.service("mongodb",
        "mongodb-atlas").db("trackme");
    this.checkins = 
      this.db.collection("checkins");
    this.users = this.db.collection("users");
    this.handleLogChange = 
      this.handleLogChange.bind(this);

  }

  componentDidMount() {

  }

  handleLogChange(loggedIn) {
    this.setState({loggedIn: loggedIn})
  }

  render() {
    return (
      <div>
        <Login
          stitchClient={this.stitchClient}
          onLoginChange={this.handleLogChange}
          userCollection={this.users}
          loggedIn={this.state.loggedIn}
        />
        <h1>Welcome to TrackMe - built with 
        MongoDB Stitch</h1>
        {this.state.loggedIn ? (
          <div>
            <AddFriend
              stitchClient={this.stitchClient}
            />
            <TextCheckin
              stitchClient={this.stitchClient}
              checkins={this.checkins}
            />
            <Checkins
              stitchClient={this.stitchClient}
            />
          </div>
          ) : null}
      </div>
    );
  }
}

class App extends Component {
  
  render() {
    return (
        <Trackme />
      )
  }
}

export default App;