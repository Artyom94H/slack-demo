import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';

import routesCode from 'routes/routesCode';
import { signIn, resetAuthErrors } from 'state/modules/user/actions';
import { getError } from 'utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { signInErrors, signInInProcess } = useSelector(state => state.user);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signIn(userData));
  };

  const onChange = e => {
    const { target: { name, value } } = e;
    setUserData(state => ({ ...state, [name]: value }));
    dispatch(resetAuthErrors);
  }
  const emailError = getError(signInErrors, 'email');
  const passwordError = getError(signInErrors, 'password');
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={ classes.form } noValidate onSubmit={ handleSubmit }>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            // autoComplete="email"
            autoFocus
            value={ userData.email }
            onChange={ onChange }
            error={ !!emailError }
            helperText={ !!emailError && emailError.msg }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            value={ userData.password }
            onChange={ onChange }
            error={ !!passwordError }
            helperText={ !!passwordError && passwordError.msg }
          />
          { !!signInErrors && signInErrors.message && (
            <div style={ { display: 'flex' } }>
              <Typography color='error'>
                { signInErrors.message }
              </Typography>
              {/*<Typography style={ { marginLeft: 16 } }>
                <a rel='noopener noreferrer' href={ `${ window.location.protocol }//${ window.location.host.replace(`${ getSubdomain() }.`, '') }` }>
                  sign in
                </a>
              </Typography>*/}
            </div>
          ) }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            disabled={ signInInProcess }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link component={ RouterLink } to={ routesCode.signUp } variant="body2">
                { "Don't have an account? Sign Up" }
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
