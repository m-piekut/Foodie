
import './css/style.css'
import Home from './Home/Home';
import LoginSite from './LoginSite/LoginSite';
import ProfileList from './ProfileSite/ProfileList';
import ProfileSite from './ProfileSite/ProfileSite';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      

      <Switch>
        <Route exact path='/'><Home/></Route>
        <Route  exact path='/users'><ProfileList/></Route>
        <Route  path='/users/:id'><ProfileSite/></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
