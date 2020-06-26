import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAvailability, resetErrors } from 'state/modules/workspaces/actions';
import { debounce, getError } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const CreateForm = ({
  onSubmit,
  subDomain = '',
  name = '',
  isUpdateMode = false,
  onDelete,
}) => {
  const [value, setValue] = useState(subDomain);
  const [localName, setLocalName] = useState(name);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleRequest = (params) => {
    dispatch(getAvailability(params));
  }

  const { availability, availabilityMsg, errors } = useSelector(state => state.workspaces);

  const onChange = (e, value) => {
    setValue(value);
    const throttledGetWorkspaces = debounce(handleRequest, 300);
    if (subDomain !== value) {
      throttledGetWorkspaces && throttledGetWorkspaces({ subDomain: value });
    }
  }

  useEffect(() => {
    setValue(subDomain);
    setLocalName(name);
  }, [subDomain, name])

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      subDomain: value,
      name: localName,
    });
  }

  const onChangeInout = ({ target: { value } }) => {
    dispatch(resetErrors());
    setLocalName(value);
  }
  const nameError = getError(errors, 'name');
  const subDomainError = getError(errors, 'subDomain');
  return (
    <Container maxWidth="sm">
      <div className={ classes.paper }>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={ handleSubmit }>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                label="name"
                name='name'
                value={ localName }
                onChange={ onChangeInout }
                error={ !!nameError }
                helperText={ nameError && nameError.msg }
              />
            </Grid>
            <Grid item xs={12}>
              { !!subDomainError && (
                <Typography color='error'>
                  { subDomainError.msg }
                </Typography>
              ) }
              { subDomain !== value && availabilityMsg && (
                <Typography color='error'>
                  { availabilityMsg }
                </Typography>
              ) }
              <Autocomplete
                id="sub-domain"
                fullWidth
                freeSolo
                inputValue={ value }
                options={availability.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Sub domain" margin="normal" variant="outlined" />
                )}
                onInputChange={ onChange }
                color='error'
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            disabled={ false }
          >
            { isUpdateMode ? 'Update' : 'Create' }
          </Button>
          { isUpdateMode && (
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={ classes.submit }
              disabled={ false }
              onClick={ onDelete }
            >
              Delete
            </Button>
          ) }
        </form>
      </div>
    </Container>

  );
};

export default CreateForm;
