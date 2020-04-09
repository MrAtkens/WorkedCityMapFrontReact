import React, { Component } from 'react';
import { Route, Router, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
 
import Main from './page'

const hist = createBrowserHistory();


class App extends Component {

 render(){
  return (
   <BrowserRouter> 
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Main} />
        <Redirect from="/" to="/map" />
      </Switch>
    </Router>
   </BrowserRouter>
  );
 }
}

export default App;
