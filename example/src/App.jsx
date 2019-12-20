import React, { Fragment } from 'react'
import Router from './router';
import Toolbar from './components/toolbar';

const App = () => {

  return (
    <Fragment>
      <Toolbar />
      <Router />
    </Fragment>
  );
}

export default App;
