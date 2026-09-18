import React, { Component } from 'react';

const quotes = [
  "Лучше поздно, чем никогда.",
  "Всё гениальное просто.",
  "Не откладывай на завтра то, что можно сделать сегодня.",
  "Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.",
  "Сложнее всего начать действовать, всё остальное зависит только от упорства."
];

class QuoteViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuote: quotes[Math.floor(Math.random() * quotes.length)]
    };
  }

  getRandomQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === this.state.currentQuote && quotes.length > 1);
    return newQuote;
  };

  handleNextQuote = () => {
    this.setState({ currentQuote: this.getRandomQuote() });
  };

  componentDidMount() {
    console.log('QuoteViewer: компонент смонтирован');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentQuote !== this.state.currentQuote) {
      console.log('QuoteViewer: цитата обновлена');
    }
  }

  componentWillUnmount() {
    console.log('QuoteViewer: компонент будет размонтирован');
  }

  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '18px', fontStyle: 'italic' }}>
          {this.state.currentQuote}
        </p>
        <button onClick={this.handleNextQuote}>Следующая цитата</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuotes: true
    };
  }

  toggleQuotes = () => {
    this.setState(prevState => ({ showQuotes: !prevState.showQuotes }));
  };

  render() {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Просмотр цитат</h2>
        <button onClick={this.toggleQuotes}>
          {this.state.showQuotes ? 'Скрыть цитаты' : 'Показать цитаты'}
        </button>
        {this.state.showQuotes && <QuoteViewer />}
      </div>
    );
  }
}

export default App;