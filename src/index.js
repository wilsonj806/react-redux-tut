import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { todoApp } from './reducers'
import App from './App'

/* so we have an actions.js file and a reducers file
both of them handle actions that trigger certain updates in the state, but now we need to
  have a place to store all of this */

// This is what the store is for and we use createStore() to do that

const store = createStore(todoApp);
  /* optionally you can include a secondary initialState param for hydrating the client with
    the app's Redux state from the server */
// const hydratedStore = createStore(todoApp, window.STATE_FROM_SERVER);

// We don't have a UI but we can still test update logic
  // the test for it can be found in ./storeTest.js

// So that's pretty much it for the store for now

/*
  React-Redux also exposes a <Provider/> component that way you can pass the store to every dependent
    component
  It seems fairly similar to the React Context API, only here you don't have to specify a Consumer component
  */
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)