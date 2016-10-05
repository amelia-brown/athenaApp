import 'babel-polyfill';
import React, { PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import App from './components/App';
import Articles from './components/Articles/Articles';
import Tickets from './components/Tickets/TicketDisplay';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    loggerMiddleware,
    promiseMiddleware()
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('entry')
)

if (module.hot) {
  module.hot.accept();
}
