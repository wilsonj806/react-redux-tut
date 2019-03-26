# Redux Notes

## Additional Documentation

- [Data Flow](./data-flow.md)
- [React Redux](./react-redux.md)

## What is Redux

Redux is a predictable state container for JavaScript apps. It provides and facilitates for centralized state handling that'll help apps run consistently no matter the environment.

## Three Principles

Referencing: [Redux Docs](https://redux.js.org/introduction/three-principles)

1.) There's a single source of truth for the State of an application
- State in Redux is stored in a single object tree that is referred to by the API as the Store
  - as this is an object, it's easy to serialize([wiki entry on it](https://en.wikipedia.org/wiki/Serialization)) and hydrated into the client with no extra effort
  ```js
    console.log(store.getState())

    /* Prints
    {
      visibilityFilter: 'SHOW_ALL',
      todos: [
        {
          text: 'Consider using Redux',
          completed: true,
        },
        {
          text: 'Keep all state in a single tree',
          completed: false
        }
      ]
    }
    */
    ```


2.) State is readonly
- if you want to change State, you need to emit an Action which describes how the change is made
- this ensures proper separation of concerns as neither your view component nor your network callback can directly modify state
  - instead they express the intent to change state and then the state handler changes it for them
- in addition, as Actions are plain objects, you can easily log/ store/ serialize them for later debugging and or testing
  ```js
    // example of an action
    const actionTodoComplete = {
      type: 'COMPLETE_TODO',
      index: 1
    }
    store.dispatch(actionTodoComplete);

    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_COMPLETED'
    })
    ```


3.) Changes are made with pure functions
- first things first, pure functions are functions that adhere to the below:
  - a pure function returns the same output value given the same inputs
  - a pure function does not have side effects
  - *Note* this gets a bit into functional programming
  - e.g the below:
  ```ts
  // the below is a pure function, it doesn't have any side effects, and it returns the same result everytime
  const calcSum = (a: number, b: number): number => a + b;

  // the below is not a pure function, the target input is being modified and even if the return is the same, target's classList property changes
  const toggleClass = (event: MouseEvent, target: HTMLElement): HTMLElement => {
    if (event.target === target) {
      target.classList.toggle('hello');
      return target;
    }
    else {
      return target;
    }
  }

  // this also is not a pure function
  const pushEle = (arr: Array, target: any): Array => {
    arr.push(target);
    return arr;
  }

  // this is a pure function as Array.prototype.concat() returns a brand new array
  const pushElePure = (arr: Array, target: any): Array => arr.concat(target);
  ```
- that said, within Redux, to spec how the state tree is transformed via an Action, you write pure Reducers
  - Reducer functions take the previous state and return a new state based on what the Action says to do
  - the name of the Reducer ends up being part of the overall State tree
    ```js
    function todos(state = [], action) {
      switch (action.type) {
        case 'ADD_TODO':
          return state.concat([{ text: action.text, completed: false }])
        case 'TOGGLE_TODO':
          return state.map((todo, index) =>
            action.index === index
              ? { text: todo.text, completed: !todo.completed }
              : todo
          )
        default:
          return state
      }
    }
    /* e.g this would end up being added as:
    {
      ...state,
      todo: [],
    } */
      ```
  - also note that we specify **pure** Reducers, we don't want to mutate State as it'll get harder to maintain *AND* harder to debug as your app grows more complex
  ```js
  function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter
      default:
        return state
    }
  }
    ```