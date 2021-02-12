import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './components/Pages/Home';
import CleanDocs from './components/Pages/CleanDocs';
import ProcessDocs from './components/Pages/ProcessDocs';
import VisualDocs from './components/Pages/VisualDocs';
import Findings from './components/Pages/Findings';
import { Error404 } from './components/Error404/Error404';

const reload = () => window.location.reload();

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/docs/clean" component={CleanDocs}/>
      <Route path="/docs/process" component={ProcessDocs}/>
      <Route path="/docs/visual" component={VisualDocs}/>
      <Route path="/findings" component={Findings}/>
      <Route path="/static/*" onEnter={reload}/>
      <Route component={Error404} />
    </Switch>
  );
}
