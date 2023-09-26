import logo from './logo.svg';
import './App.css';
import { useState, useEffect,TouchEvent } from 'react';
import * as React from 'react';


function App() {
  const [data, setData] = useState("");
  const getMovies = async () => {
    
    try {
        const response = await fetch('http://10.0.0.234:3000',{ mode: 'cors'});
        const json = await  response.json();    
        setData(JSON.stringify(json));
    
        
        console.log("test2")
    } catch (error) {
      alert("test2")
        alert(error)
        console.error(error);
    } finally {
  
    }
  };

  useEffect(() => {
    getMovies();
  });

  return (
    <div className="App">
      
      <header className="App-header">
      <div>{data} test</div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

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
