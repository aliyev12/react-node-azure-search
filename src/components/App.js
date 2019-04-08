import React from 'react';
import SearchUI from './SearchUI';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Item from './Item';
import {Store} from '../context/Context';
import Navbar from './Navbar';

class App extends React.Component {
  render () {
    return (
      <Store>
        <Router>
        <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={SearchUI} />
            <Route path="/items/:id" component={Item} />
          </Switch>
        </Router>
      </Store>
    );
  }
}

export default App;
