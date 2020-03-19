import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

window.SW = window.screen.availWidth;
window.SH = window.screen.availHeight;

function App() {
  document.getElementsByTagName("html")[0].style.fontSize = window.SW * 0.005;
  return (
    <Router>
      <Switch>
        <Route exact path={"/"}>
          home
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
