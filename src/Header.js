import { Button, Input, Link, makeStyles, Modal } from "@material-ui/core";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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



const Header = () => {
    const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [OpenLogout, setOpenLogout] = useState(false)
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
      setOpen(false)
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
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });

}
const logout = (e) => {
  auth.signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
    return ( 
        <div className="signup">
            {user&& <p>{user.displayName}</p>}
    <Modal className="modal"
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
          <p>Masz konto? </p>
          <Button onClick={()=>{setOpenLogin(true); setOpen(false)}}>Zaloguj </Button>
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
            <Button type="submit" onClick={login}>Login</Button>
          </form>
          <p>Nie masz konta? </p>
          <Button onClick={()=>{setOpenLogin(false); setOpen(true)}}>Zarejestruj </Button>
          </center>
        </div>
      </Modal>
      <Modal
        open={OpenLogout}
        onClose={()=> setOpenLogout(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
          
          <p>Zostałeś wylogowany/a</p>
          <Button onClick={()=> setOpenLogout(false)}>ok</Button>
          </center>
        </div>
      </Modal>

      {!user ? 
    // <Button onClick={()=> setOpen(true)}>Sign Up</Button>
    <Button onClick={()=> setOpenLogin(true)}>LOGIN</Button> :
    <Button 
    onClick={()=> {setOpenLogout(true);
    logout()  }}>
        Wyloguj
    </Button>
      }
    <NavLink  to="/dinners">
    <Button>Uczty</Button>
    </NavLink>
        </div>
    );
}

export default Header;