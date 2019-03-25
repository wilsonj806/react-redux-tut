import { VisibilityFilters, ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from "./actions";

/* NOTE You should be trying to determine the shape that you want your State to look like before coding
  (i.e what's the minimal representation of your app State as an object)
  - general rule of thumb is to keep UI State separate from any stored data
  - also prefer normalized keys over nesting state vars in other state vars
    - it's cleaner/ easier to maintain
 */
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
const sampleReducer = (prevState, action) => new SampleState();

/*
  Note this looks like the type of callback Array.prototype.reduce() accepts
    and coincidentally the type of callback this.setState() from React can accept

  Also note that we prefer keeping the Reducer pure, at least for now.
    - this means no side effects/ mutations of inputs or calls to impure functions
    - there is a way to do stuff with side-effects but that's later
  */

// Before we start doing a whole bunch of different things with reducers, we need to define an initial state

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

// reducer function below:

const todoApp = (state = initialState, action) => {
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
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    // for TOGGLE_TODO the values are a map of the current state, but if it's the current index, we invert the current compledted value
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
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