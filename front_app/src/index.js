import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from 'store';
import { ConnectedRouter } from 'connected-react-router';
import App from 'App';

render(
  <React.StrictMode>
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


