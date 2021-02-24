import React from "react";
import logo from './logo.svg';
import './App.css';

function createUnusableObject(usageError) {
   return new Proxy({}, {
     get(_target, key) {
      console.log(_target, key);
      // work around
      // if (key === "$$typeof") return undefined;
      throw Error("cannot use object: " + usageError);
    }
   });
}

const myContextDefaultState = createUnusableObject("you must have a provider to use MyContext");

export const MyContext = React.createContext(myContextDefaultState);

export function MyContextConsumer(props) {
  const ctx = React.useContext(MyContext);
  return <>{ctx.data}</>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MyContextConsumer />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
