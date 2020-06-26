import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import CreateForm from 'components/Workspace/Form';
import queryString  from 'query-string';
import Typography from '@material-ui/core/Typography';
import { createWorkspace } from 'api';
import { getAuthUser } from 'state/modules/user/actions';
import { getSubdomain } from 'utils';
import { Link } from 'react-router-dom';
import routesCode from 'routes/routesCode';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  create_workspace: {
    marginTop: 50,
  },
  table_header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '36px 0 18px 0',
  }
});

const Home = () => {
  const { user } = useSelector(state => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = params => {
    createWorkspace({ ...params, userId: user.id })
      .then(() => {
        dispatch(getAuthUser());
      })
      .catch(console.error);
  }

  useEffect(() => {
    const token = queryString.parse(window.location.search).token;
    dispatch(getAuthUser(token));
  }, [dispatch]);

  const subDomain = getSubdomain();
  const currentWorkspace = user.workspaces ? user.workspaces.find(i => i.subDomain === subDomain) : {}
  return (
    <div className={classes.root}>
      { !!user.workspaces && !user.workspaces.length ? (
        <div className={ classes.create_workspace }>
          <Typography align='center'>
            You dont have any workspaces, please create one
          </Typography>
          <CreateForm onSubmit={ onSubmit } />
        </div>
      ) : (
        <div>
          { !!currentWorkspace ? (
            <>
              <Typography align='center'>
                Welcome to { currentWorkspace.name } workspace
              </Typography>
              <Typography align='center'>
                <Link to={ routesCode.workspaces }>
                  More workspaces
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography align='center'>
                <Link to={ routesCode.workspaces }>
                  Go to your workspaces
                </Link>
              </Typography>
            </>

          ) }
        </div>
      ) }
    </div>
  );
};

export default Home;
