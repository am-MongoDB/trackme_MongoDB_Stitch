import React from 'react';
import './App.css';

export class TextCheckin 
    extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      success: "",
      textNumber: "+1xxxxxxxxxxxxxx"
    }

    this.handleNumChange = this.handleNumChange.bind(this);
    this.sendText = this.sendText.bind(this);

  }

  componentDidMount() {
  }

  handleNumChange(event) {
    this.setState({
      textNumber: event.target.value})
  }

  sendText(event) {
    this.setState({success: ""});
    this.setState({error: ""});

    this.props.stitchClient.executeFunction(
      "sendText", this.state.textNumber)
    .then (
      response => {
       this.setState({success: 
              "Text has been sent to " + this.state.textNumber});
      },
      error => {
        this.setState({error:
            "Failed to send text: " + error});
        console.log({error: 
            "Failed to send text: " + error});
      }
    );
  }

  handleFocus(event) {
    event.target.select();
  }

 render() {
    return (
      <div>
        <h2>Send an SMS text with your latest 
        checkin</h2>
        <div>
          <label>
            Phone number to send text to: 
            <input type="text" size="50"
              value={this.state.textNumber}
              onChange={this.handleNumChange}
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