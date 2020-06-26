import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import suspense from 'hoc/suspense';

import AuthRoute from './auth';
import routesCode from './routesCode';

const Home = lazy(() => import('views/Home'));
const SignIn = lazy(() => import('views/SignIn'));
const SignUp = lazy(() => import('views/SignUp'));
const Workspaces = lazy(() => import('views/Workspaces'));
const WorkspacesShow = lazy(() => import('views/Workspaces/show'));
const WorkspacesCreate = lazy(() => import('views/Workspaces/create'));



const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path={ routesCode.home } component={ suspense(Home) } />
      <Route exact path={ routesCode.signIn } component={ suspense(SignIn) } />
      <Route exact path={ routesCode.signUp } component={ suspense(SignUp) } />
      <AuthRoute exact path={ routesCode.workspaces } component={ suspense(Workspaces) } />
      <AuthRoute exact path={ routesCode.workspacesCreate } component={ suspense(WorkspacesCreate) } />
      <AuthRoute exact path={ routesCode.workspacesShow } component={ suspense(WorkspacesShow) } />
    </Switch>
  )
}

export default Routes;
