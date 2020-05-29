import React, { Component } from 'react';
 
class App extends Component {
  constructor(props) {
    super(props);
    
    // initial values
    this.state = {
      urlValue: 'paste a link here',
      data: {},
      alreadyRequested: false,
      resultsLength: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({urlValue: event.target.value});
    this.setState({alreadyRequested: false});
  }
  
  handleSubmit(event) {
    console.log('A url was submitted: ' + this.state.urlValue);
    console.log(this.state.data);

    if(this.state.urlValue.includes('www') && !this.state.alreadyRequested){
      console.log('requesting!');
      fetch("http://www.reddit.com/api/info.json?url=" + this.state.urlValue)
          .then(response => response.json())
          .then(data => this.setState({ data }))
        
      this.setState({alreadyRequested: true});
    }
    event.preventDefault();
  }

  componentDidUpdate() {
    this.processData();
  }
  
  processData() {
    if(this.state.data['data'] !== undefined){
      console.log('processing');
      console.log(this.state.data["data"]["children"].length);
      if(this.state.data["data"]["children"].length !== this.state.resultsLength){
        this.setState({resultsLength: this.state.data["data"]["children"].length});
      }
    }
  }

  render() {
    return (
    <div> 
      <form onSubmit={this.handleSubmit}>
        <input id="urlInput" type="text" value={this.state.urlValue} onChange={this.handleChange} />
        <input id="urlSubmitButton" type="submit" value="Search" />
      </form>
      <div>https://www.cnn.com/2020/05/28/us/video-george-floyd-contradict-resist-trnd/index.html</div>
      <div>https://www.youtube.com/watch?v=n6QwnzbRUyA</div>
      <div>{this.state.resultsLength}</div>
    </div>
    );
  }

}

export default App;
