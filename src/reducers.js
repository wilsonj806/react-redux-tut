import { VisibilityFilters, ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from "./actions";

import { combineReducers } from 'redux';

/* NOTE You should be trying to determine the shape that you want your State to look like before coding
  (i.e what's the minimal representation of your app State as an object)
  - general rule of thumb is to keep UI State separate from any stored data
  - also prefer normalized keys over nesting state vars in other state vars
    - it's cleaner/ easier to maintain
 */
// eslint-disable-next-line
const exampleState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}

/* previously we used Action Creators to dispatch actions,
  but as mentioned by the docs we don't do that directly.
This is what reducers are for, and as it turns out resembles a number of things
*/

// So reducers look like the below:
class SampleState {
  desc = 'mock State'
}
// eslint-disable-next-line
const sampleReducer = (prevState, action) => new SampleState();

/*
  NOTE the above looks like the type of callback Array.prototype.reduce() accepts
    and coincidentally the type of callback this.setState() from React can accept

  Also note that we prefer keeping the Reducer pure, at least for now.
    - this means no side effects/ mutations of inputs or calls to impure functions
    - there is a way to do stuff with side-effects but that's later
  */

// Before we start doing a whole bunch of different things with reducers, we need to define an initial state

const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

// reducer function below:

/*
NOTE since we're using switch() it's going to get pretty unwieldly to have a bunch of callbacks
  to the point where our reducer is like 100's of lines of code

  We can mitigate this with reducer composition, where we split the responsibility of handling state
  up between multiple smaller functions, and make one function determine which function to run
  based on the type of action taken
 */

const todos = (todosState = [], action) => {
  // console.log('determining action type for todos');
  switch (action.type) {
    case ADD_TODO:
      return [
        ...todosState,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return todosState.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todosState
      })
    default:
      // console.log('i have been called as todo');
      return todosState
  }
}

const visibilityFilter = (visFilterState = SHOW_ALL, action) => {
  // console.log('determining action type for visibility filter');
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      // console.log('i have been called as visibility filter');
      return visFilterState
  }
}

// NOTE below is the first version of the todoApp reducer with PARTIAL composition
// eslint-disable-next-line
const todoAppInit = (state = initialState, action) => {
  // ES6 gives you function default params but if we didn't have that, we'd use the below
  // if (typeof state == null) return initialState

  // we'll be using a switch statement to check the type of action
  const { type } = action;
  switch(type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })

    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    // for TOGGLE_TODO the values are a map of the current state, but if it's the current index, we invert the current compledted value
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    default:
      return state;
  }
  /*
    Note on Object.assign(), general syntax is:
      Object.assign(obj, {...newValues/ Object to append})
    Also note: the switch is not the real boilerplate, it just helps with the implementation
      of dispatching updates, creating a store, and using objects as the store
    */
}

// If we're composing various parts of our state together, then the final reducer looks like the below:

// eslint-disable-next-line
const todoAppManual = (state = initialState, action) => {
  /* NOTE it's worth pointing out that with our set up, two functions are handling their own
    small piece of the app's state rather than the big block above
  Since they're all pure functions, it's super easy to test as the output is straight forwards */
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

// Redux gives a utility that more or less does the above and an example can be seen below

export const todoApp = combineReducers({
  visibilityFilter,
  todos
})

// in addition, you can assign a different key to each part of your app's state like so:
/* const sampleReducer = combineReducers({
  a: doAThing,
  b: b,
  c: doAThingForC
}) */

