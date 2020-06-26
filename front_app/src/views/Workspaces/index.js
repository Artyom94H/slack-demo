import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { Link as ReactLink } from 'react-router-dom';
import routesCode from 'routes/routesCode';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from 'components/Workspace/List';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkspace } from 'api';
import { getAuthUser } from 'state/modules/user/actions';

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

const Workspaces = () => {
  const classes = useStyles();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onDelete = id => {
    deleteWorkspace(id)
      .then(() => {
        dispatch(getAuthUser());
      })
      .catch(console.error);
  }

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <div className={ classes.table_header }>
        <Typography align='center'>
          You workspaces
        </Typography>
        <Link component={ ReactLink } to={ routesCode.workspacesCreate }>
          <Fab color="primary" aria-label="edit" size='small'>
            <AddIcon />
          </Fab>
        </Link>
      </div>
      { user.workspaces.length ? (
        <List data={ user.workspaces } onDelete={ onDelete } />
      ) : (
        <Typography color='textSecondary' align='center'>
          You dont have a any workspaces
        </Typography>
      ) }
    </Container>
  );
};

export default Workspaces;
