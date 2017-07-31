import { builtins } from 'mongodb-stitch';
import React from 'react';
import './App.css';

export class AddFriend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      success: "",
      friendsEmail: "someone@somedonain.com"
    }

    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.addFriend=this.addFriend.bind(this);

  }

  componentDidMount() {
  }

  handleEmailChange(event) {
    this.setState({friendsEmail: event.target.value})
  }

  addFriend(event) {
    this.setState({success: ""});
    this.setState({error: ""});
    let email = this.state.friendsEmail;

    this.props.stitchClient
      .executePipeline([
        builtins.namedPipeline('alreadyAFriend', {
          friendsEmail: email
        })])
      .then(
        response => {
          if (response.result[0]) {
            this.setState({error: email + " has already been included as a friend."});
            console.log(email + " has already been included as a friend.")
          } else
          {
            this.props.stitchClient
              .executePipeline([
                builtins.namedPipeline('addFriend', {
                  friendsEmail: email
              })])
              .then(
                response => {
                  if (response.result[0]) {
                    this.setState({success: email + " added as a friend; they can now see your checkins."});
                    console.log(email + " added as a friend; they can now see your checkins.");
                  } else {
                    this.setState("Failed to add " + email + " as a friend");
                  }
                },
                error => {
                  this.setState({error: "Error: " + error});
                  console.log({error: "Error: " + error});
                }
              )
          }
        },
        error => {
            this.setState({error: "Error: " + error});
            console.log({error: "Error: " + error});
        }
      )
  }

  handleFocus(event) {
    event.target.select();
  }

 render() {
    return (
      <div>
        <h2>Add a friend's email address so that they can stalk you</h2>
        <div>
          <label>
            email address of friend to add: 
            <input type="text" size="50"
              value={this.state.friendsEmail}
              onChange={this.handleEmailChange}
              onFocus={this.handleFocus}
            />
          </label><br/>
          <button onClick={this.addFriend}>
            {"Add " + this.state.friendsEmail + " as friend"}
          </button>
                    <br/><br/>
          <span className="successMessage">
            {this.state.success}
          </span>
          <span className="errorMessage">
            {this.state.error}
          </span>
        </div>
      </div>
    );
  }
}