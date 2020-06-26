import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { logout } from 'state/modules/user/actions';
import routesCode from 'routes/routesCode';
import { getSubdomain } from 'utils';

const Private = ({ children, isAuth }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickSignOut = () => {
    handleClose();
    dispatch(logout());
  }

  const onClickProfile = () => {
    handleClose();
  }
  const subDomain = getSubdomain();
  const currentWorkspace = user.workspaces ? user.workspaces.find(i => i.subDomain === subDomain) || {} : {}
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Link component={ ReactLink } to={ routesCode.home } color='inherit'>
            { currentWorkspace.name || user.fullName }
          </Link>
          { isAuth && (
            <div style={ { flexGrow: 1, justifyContent: 'flex-end', display: 'flex' } }>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={onClickProfile}>
                  <Link component={ ReactLink } to={ routesCode.workspaces}>
                    Workspaces
                  </Link>
                </MenuItem>
                <MenuItem onClick={onClickSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <main style={ { marginTop: 70 } }>
        { children }
      </main>
    </>
  );
};

export default Private;
