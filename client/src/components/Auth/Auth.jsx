import React, { useState } from 'react'
import {Paper, Container, Grid, Avatar, Button, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';

import useStyles from './styles'
import Input from './Input';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from '../../actions/auth'

const initialState = {
  firstName: '', 
  lastName: '',
  email: '',
  password: '', 
  confirmPassword: '',
}

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup){
      dispatch(signup(formData, navigate))
    }else{
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleShowPassword = () => {
    setShowPassword(prevShowPasword => !prevShowPasword)
  }

  const switchMode = () => { 
    setIsSignup(prevState => !prevState);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try{
      dispatch({type: 'AUTH', data: {result, token}})
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }
  const googleFailure = () => {
    console.log("Google Signin was unsuccessful");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}><LockOutlinedIcon/></Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Log in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                </>
              )
            }
            <Input name="email" label="Email" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId='179164452923-o93c1bc6hi0jhu7sdvj32omfefi0vsvj.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button 
                variant="contained" 
                className={classes.googleButton} 
                color="primary" 
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon/>}>
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already Have An Account? Sign In' : 'Dont\'t have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth