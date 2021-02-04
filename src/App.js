
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


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const usubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user loged in
        console.log(authUser)
        setUser(authUser)
        
      }else{
        setUser(null);
      }
    })
    return () => {
      usubscribe()
    }
  },[user, username])

  const signUp = (e) =>{
    e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    setUser( userCredential.user);
    auth.currentUser.updateProfile({
      displayName: username
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
  }
  const login = (e) =>{
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    setUser( userCredential.user);
    auth.currentUser.updateProfile({
      displayName: username
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
  }
  



  return (
    <Router>
    <div className="App">
      {user&& <p>{user.displayName}</p>}
    <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
          <form className="App__signUp">
            <Input
              type="text"
              placeholder = "username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder = "email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder = "password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
          </center>
        </div>

      </Modal>
    <Modal
        open={openLogin}
        onClose={()=> setOpenLogin(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
          <form className="App__signUp">
            <Input
              type="text"
              placeholder = "email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder = "password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit" onClick={login}>Sign Up</Button>
          </form>
          </center>
        </div>

      </Modal>
    <Button onClick={()=> setOpen(true)}>Sign Up</Button>
    <Button onClick={()=> setOpenLogin(true)}>LOGIN</Button>
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
