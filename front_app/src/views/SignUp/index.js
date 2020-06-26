import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import { getError } from 'utils';

import routesCode from 'routes/routesCode';
import { signUp, resetAuthErrors } from 'state/modules/user/actions';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const dispatch = useDispatch();
  const { signUpErrors, signUpInProcess } = useSelector(state => state.user);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUp(userData));
  };

  const onChange = e => {
    const { target: { name, value } } = e;
    setUserData(state => ({ ...state, [name]: value }));
    dispatch(resetAuthErrors());
  }

  const emailError = getError(signUpErrors, 'email');
  const fullNameError = getError(signUpErrors, 'fullName');
  const passwordError = getError(signUpErrors, 'password');
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={ handleSubmit }>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                onChange={ onChange }
                error={ !!fullNameError }
                helperText={ !!fullNameError && fullNameError.msg }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={ onChange }
                error={ !!emailError }
                helperText={ !!emailError && emailError.msg }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ onChange }
                error={ !!passwordError }
                helperText={ !!passwordError && passwordError.msg }
              />
            </Grid>
            <Grid item xs={12} />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={ signUpInProcess }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={ RouterLink } to={ routesCode.signIn } variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
