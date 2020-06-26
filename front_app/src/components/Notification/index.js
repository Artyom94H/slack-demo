import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { closeNotification } from 'state/modules/notification/actions';
import Portal from '@material-ui/core/Portal';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification() {
  const dispatch = useDispatch();
  const { showNotification, msg } = useSelector(state => state.notification);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeNotification());
  };
  return (
    <Portal>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          { msg }
        </Alert>
      </Snackbar>
    </Portal>
  );
};
