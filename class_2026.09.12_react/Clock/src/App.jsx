import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      time: new Date().toLocaleTimeString(),
    });
  };

  render() {
    return (
      <div>
        <h2>Текущее время:</h2>
        <p>{this.state.time}</p>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClock: true,
    };
  }

  toggleClock = () => {
    this.setState((prevState) => ({
      showClock: !prevState.showClock,
    }));
  };

  render() {
    return (
      <div>
        <h1>Пример </h1>
        <button onClick={this.toggleClock}>
          {this.state.showClock ? 'Удалить часы' : 'Показать часы'}
        </button>

        {this.state.showClock && <Clock />}
      </div>
    );
  }
}

export default App;