import React from 'react';
import './App.css';

export class TextCheckin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      success: "",
      textNumber: "+1xxxxxxxxxxxxxx"
    }

    this.handleNumberChange=this.handleNumberChange.bind(this);
    this.sendText=this.sendText.bind(this);

  }

  componentDidMount() {
  }

  handleNumberChange(event) {
    this.setState({textNumber: event.target.value})
  }

  sendText(event) {
    this.setState({success: ""});
    this.setState({error: ""});

    let name = "Someone mysterious";
    let venue = "somewhere mysterious";

    this.props.checkins.find({},{sort: {_id: -1}, limit: 1})
    .then (
      response => {
        venue = response[0].venueName;
        this.props.stitchClient.userProfile()
        .then (
          response => {
            name = response.data.name;
          })
        .then (
          response => {

            this.props.stitchClient
              .executePipeline([
                {
                  service: "myTwilio",
                  action: "send",
                  args: {
                    to: this.state.textNumber,
                    from: "%%values.twilioNumber",
                    body: name + " last cheked into " + venue
                  }
                }
              ])
              .then(
                response => {
                    this.setState({success: "Text has been sent to " + this.state.textNumber});
                    console.log("Text has been sent to " + this.state.textNumber);
                },
                error => {
                  this.setState({error: "Failed to send text: " + error});
                  console.log({error: "Failed to send text: " + error});
              })
        })
      },
        error => {
        this.setState({error: "Failed to read the latest checkin: " + error})
        }
      )
  }

  handleFocus(event) {
    event.target.select();
  }

 render() {
    return (
      <div>
        <h2>Send an SMS text with your latest checkin</h2>
        <div>
          <label>
            Phone number to send text to: 
            <input type="text" size="50"
              value={this.state.textNumber}
              onChange={this.handleNumberChange}
              onFocus={this.handleFocus}
            />
          </label><br/>
          <button onClick={this.sendText}>
            {"Send text to " + this.state.textNumber}
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