
import './css/style.css'
import './css/small.css'
import './css/medium.css'
import './css/large.css'
import './css/xlarge.css'     

import Home from './Home/Home';


import ProfileSite from './ProfileSite/ProfileSite';
import DinnersList from './Dinners/DinnersList';
import DinnerInfo from './Dinners/DinnerInfo';
import {BrowserRouter as Router, Route, Switch,  withRouter} from 'react-router-dom';
import MakeDinner from './MakeDinner';

import Header from './Header';
import Site404 from './Site404'




function App() {
  


  return (
    <Router>
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/'><Home/></Route>

        <Route  exact path='/users/:id' component={withRouter(ProfileSite)} />
        <Route  exact path='/dinners'><DinnersList/></Route>
        <Route  path='/dinners/:id'><DinnerInfo/></Route>
        <Route  path='/make'><MakeDinner/></Route>
        <Route component={Site404} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
