import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

/** NOTE
 * So as mentioned in the react-redux-basics.md file, AddTodo is a mix between presentational
 *  and container component
 * We don't require data from the Redux store to render anything, but we do dispatch
 *  actions when we click the submit/ add item button
 *
 * So for the most part the actual scripting for the component is pretty straight-forwards
 *  (save for the React ref maybe)
 *
 * It's however worth noting that the way we make the HOC from Redux looks like: connect({props})(Component)
 *  this looks super funny, but it works out fine because the connect() method returns a function which is then executed
 *  with the input argument, Component
 */

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo