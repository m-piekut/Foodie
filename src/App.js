
import './css/style.css'
import Home from './Home/Home';
import LoginSite from './LoginSite/LoginSite';
import ProfileList from './ProfileSite/ProfileList';
import ProfileSite from './ProfileSite/ProfileSite';
import DinnersList from './Dinners/DinnersList';
import DinnerInfo from './Dinners/DinnerInfo';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MakeDinner from './MakeDinner';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input} from '@material-ui/core';
import { useEffect, useState } from 'react';
import {auth} from './firebase'
import Header from './Header';




function App() {
  
  



  return (
    <Router>
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/'><Home/></Route>
        <Route  exact path='/users'><ProfileList/></Route>
        <Route  path='/users/:id'><ProfileSite/></Route>
        <Route  exact path='/dinners'><DinnersList/></Route>
        <Route  path='/dinners/:id'><DinnerInfo/></Route>
        <Route  path='/make'><MakeDinner/></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
