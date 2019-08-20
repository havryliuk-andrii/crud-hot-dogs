import React from 'react';
import {Route} from 'react-router-dom';
import List from './components/List';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/list" render={()=><List />} />
    </div>
  );
}

export default App;
