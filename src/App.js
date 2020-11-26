import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Thank you for trying out my site! Click on the link below to return to the Dashboard
        </p>
        <a
          className="App-link"
          href="/dashboard"
        >
          Dashboard
        </a>
      </header>
    </div>
  );
}

export default App;
