# Redux Data Flow

## General Overview

Redux architecture revolves around **strict unilateral data flow**.
- It means the data in your app follows the same lifecycle patterns, thus making the logic more predictable and easier to understand
- It also encourages data normalization that way you don't have multiple independent copies of the same data which are unaware of one another

## Data Lifecycle

The data lifecycle in Redux follows the following four steps:

**1.) You call `store.dispatch(action)`**

An action as mentioned before is a JavaScript object that describes what happened/ what is going to change
  ```js
  const likeArticle = { type: 'LIKE_ARTICLE', articleId: 42 }
  const fetchUserSuccess = { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
  const addTodo = { type: 'ADD_TODO', text: 'Read the Redux docs.' }
  ```
- Such as, user `LIKE_ARTICLE` number 42 or `FETCH_USER_SUCCESS`, Mary and etc

**2.) The Redux store calls the reducer attached to the key**

The store then passes two arguments to the reducer when called, the current state, and the action to take.

For example, a todo app action dispatch might look like:
  ```js
  // The current application state (list of todos and chosen filter)
  let previousState = {
    visibleTodoFilter: 'SHOW_ALL',
    todos: [
      {
        text: 'Read the docs.',
        complete: false
      }
    ]
  }

  // The action being performed (adding a todo)
  let action = {
    type: 'ADD_TODO',
    text: 'Understand the flow.'
  }

  // Your reducer returns the next application state
  let nextState = todoApp(previousState, action)
  ```

Note that reducers are **intended to be pure functions**. Given a series of inputs, we should be able to predict the output **and** be repeatable.

In addition it *should not* perform side-effects(API calls or router transitions). Those should be performed before the action is dispatched.


**3.) The root reducer may combine the output of multiple reducers into a single state tree.**

Note that how you structure the root reducer is entirely up to you.

Redux ships with a `combineReducers` utility function for "splitting" the root reducer into several smaller functions that manage their own separate part of the state tree.

Going a bit into how `combineReducers` works, given the below reducer functions:
```js
function todos(state = [], action) {
  // Somehow calculate it...
  return nextState
}

function visibleTodoFilter(state = 'SHOW_ALL', action) {
  // Somehow calculate it...
  return nextState
}

let todoApp = combineReducers({
  todos,
  visibleTodoFilter
})
```

When we dispatch an action the below is done in some way:
```js
// Dispatch action
store.dispatch(callbackFn(action));
const callbackFn = (action) => {
  const state = store.getState();

  // Given the current action, update each part of the state tree if necessary
  // update todos
  let nextTodos = todos(state.todos, action);
  // update visibilFilters
  let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);

  // return an object with the updated state
  return {
    todos: nextTodos,
    visibleTodoFilter: nextVisibleTodoFilter
  }
}
```

**4.) The Redux store saves the complete state tree returned by the root reducer.**

This new tree is now the next state of your app! Every listener registered with `store.subscribe`(listener) will now be invoked; listeners may call `store.getState()` to get the current state.

Now, the UI can be updated to reflect the new state. If you use bindings like React Redux, this is the point at which `component.setState(newState)` is called.


