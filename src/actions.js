/* NOTE General overview

Actions are payloads of information that send data from your app to your store. They are the ONLY source of information for the store. */

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER
}

// note that the key 'type' is required in an Action object and everything else is up to the programmer
// for a Todo task we'll want to track the task name, keep count of these as its going into an array, and we want to track completion progress
// this will give the below
const actionAddTodo = {
  type: ADD_TODO,
  index: 5,
  isCompleted: false,
  text: 'Build my first Redux App'
};

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};


// to update the State inside the store, we need Action Creators, which returns whatever action we have going on
export const addTodo = (textTodo) => {
  return {
    type: ADD_TODO,
    text: textTodo
  }
}

/*
this makes it super easy to test
e.g:
  describe('an action creator for a todo list')
    it('returns a todo action')
      expect(return).toBe(todoAction)
 */

// Course we need to call it from somewhere so we use the dispatch() method to tell the store that we're dispatching an action
  // We can then use Bound Action Creators to automatically dispatch said actions
  // NOTE we'll probably actually be accessing dispatch() via helper functions such as react-redux's connect()
const store = {desc: 'a mock store'};
const boundAddTodo = text => store.dispatch(addTodo(text));

// In addition Action Creators might be asynchronous and have side-effects. The Redux docs has a section on that

export const toggleTodo = (index) => {
  return { type: TOGGLE_TODO, index }
}

export const setVisibilityFilter = (filter) => {
  return { type: SET_VISIBILITY_FILTER, filter }
}

