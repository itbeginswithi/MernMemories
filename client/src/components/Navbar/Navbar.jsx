import React, { useEffect, useState } from "react";
import { Container,Typography, AppBar, Avatar, Toolbar, Button } from "@material-ui/core";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import decode from 'jwt-decode';

import useStyles from "./styles";
import memories from "../../images/memories.png";
import memoriesText from "../../images/memoriesText.png";

const Navbar = () => {
  const {authData} = useSelector(state => state.auth) ;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { 
    const token = user?.token;
    //JWT
    if(token){
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  // useEffect(() => {
  //   if(authData?.result) setUser(JSON.parse(localStorage.getItem('profile')))
  // }, [authData])

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    setUser(null);
    navigate('/');
  }
    
  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Container className={classes.brandContainer} component={Link} to="/">
        <img
          src={memoriesText}
          alt="icon"
          height="45"
        />
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </Container>
      <Toolbar className={classes.toolbar}>
          {user ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                  {!user?.result?.imageUrl && user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>          
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;