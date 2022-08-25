import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//----------Components----------

import Home from './components/Home';
import Welcome from './components/Welcome';
import NavBar from './components/NavBar';
import Create_Pokemon from './components/Create_Pokemon';
import Search from './components/SearchBar';
import CardDetails from './components/CardDetails';

//--------------------------------

function App() {
  return (
    <>
      <Router>
        <Route path='/:route'>
          <NavBar />
          <Route path='/home' component={Home} />
          <Route path='/search' exact component={Search} />
          <Route path='/create' component={Create_Pokemon} />
          <Route path='/pokemon/:id' component={CardDetails} />
        </Route>
        <Route path='/' exact component={Welcome} />
      </Router>
    </>
  );
}

export default App;
