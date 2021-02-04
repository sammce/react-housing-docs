import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from './components/Home/Home'
import { Error404 } from './components/Error404/Error404';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route path="/documentation" component={Docs} /> */}
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default App;
