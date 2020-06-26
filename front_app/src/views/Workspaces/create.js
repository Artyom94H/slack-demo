import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'components/Workspace/Form';
import { create } from 'state/modules/workspaces/actions';

const Create = () => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmit = params => {
    dispatch(create({
      ...params,
      userId: user.id,
    }));
  };

  return (
    <Form onSubmit={ onSubmit } />
  );
};

export default Create;
