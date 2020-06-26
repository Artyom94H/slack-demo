import React, { useEffect, useState } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import Form from 'components/Workspace/Form';
import { getWorkspace, deleteWorkspace } from 'api';
import { update } from 'state/modules/workspaces/actions';
import routesCode from 'routes/routesCode';
import { showNotification } from 'state/modules/notification/actions';

const ShowWorkspace = ({ match }) => {
  const [data, setData] = useState({});
  const { params } = match;

  const dispatch = useDispatch();

  const onSubmit = newData => {
    if (newData.subDomain === data.subDomain) {
      delete newData.subDomain;
    }
    dispatch(update(data.id, newData));
    dispatch(showNotification({ msg: `${ newData.name } has been updated` }));
  }

  useEffect(() => {
    getWorkspace(params.id)
      .then((response) => {
        if (!response.data) {
          dispatch(push(routesCode.home));
        } else {
          setData(response.data);
        }
      })
      .catch(err => console.error('Err => ', err.response));
  }, [dispatch, params]);

  const onDelete = () => {
    deleteWorkspace(data.id)
      .then(() => {
        dispatch(push(routesCode.home));
      })
      .catch(console.error);
  }

  return (
    <div>
      <Form
        onSubmit={ onSubmit }
        subDomain={ data.subDomain }
        name={ data.name }
        isUpdateMode={ true }
        onDelete={ onDelete }
      />
    </div>
  );
};

export default ShowWorkspace;
