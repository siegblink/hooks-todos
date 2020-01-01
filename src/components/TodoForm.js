import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import uuidv4 from 'uuid/v4'
import TodosContext from '../context'

export default function TodoForm() {
  const [todo, setTodo] = useState('')
  const { state, dispatch } = useContext(TodosContext)

  useEffect(
    function() {
      if (state.currentTodo.text) {
        setTodo(state.currentTodo.text)
      } else {
        setTodo('')
      }
    },
    [state.currentTodo.text, setTodo]
  )

  async function handleSubmit(event) {
    event.preventDefault()
    if (state.currentTodo.text) {
      const response = await axios.patch(
        `https://hooks-api.siegblink.now.sh/todos/${state.currentTodo.id}`,
        {
          text: todo,
        }
      )
      dispatch({ type: 'UPDATE_TODO', payload: response.data })
    } else {
      if (!todo) {
        return state
      }
      if (
        state.todos.findIndex(someTodo => someTodo.text === todo.payload) > -1
      ) {
        return state
      }
      const response = await axios.post(
        'https://hooks-api.siegblink.now.sh/todos',
        {
          id: uuidv4(),
          text: todo,
          complete: false,
        }
      )
      dispatch({ type: 'ADD_TODO', payload: response.data })
    }
    setTodo('')
  }

  return (
    <form className='flex justify-center pt-5' onSubmit={handleSubmit}>
      <input
        type='text'
        className='border border-black border-solid border-2 py-2 px-4 mb-0'
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  )
}
