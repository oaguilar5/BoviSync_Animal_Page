import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";


import './assets/css/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Dashboard from './views/Dashboard.jsx';
import App from './App.js'

var itemMetaUrl = 'https://bovisync.bitbucket.io/sample_data/item_meta.json'
var pageMetaUrl = 'https://bovisync.bitbucket.io/sample_data/page_meta.json'
var animalDataUrl = 'https://bovisync.bitbucket.io/sample_data/animal_data.json'


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/dashboard" render={props => <Dashboard {...props} itemMetaUrl={itemMetaUrl} pageMetaUrl={pageMetaUrl} animalDataUrl={animalDataUrl}/>} />
      <Route path="/app" render={props => <App {...props}  />} />
      <Redirect from="/" to="/dashboard"/>
    </Switch>
  </Router>,
  document.getElementById("root") || document.createElement('div')
);

