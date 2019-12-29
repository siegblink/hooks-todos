import React, { useState, useContext, useEffect } from 'react'
import TodosContext from '../context'

export default function TodoForm() {
  const [todo, setTodo] = useState('')
  const {
    state: { currentTodo },
    dispatch,
  } = useContext(TodosContext)

  useEffect(
    function() {
      if (currentTodo.text) {
        setTodo(currentTodo.text)
      } else {
        setTodo('')
      }
    },
    [currentTodo.text, setTodo]
  )

  function handleSubmit(event) {
    event.preventDefault()
    if (currentTodo.text) {
      dispatch({ type: 'UPDATE_TODO', payload: todo })
    } else {
      dispatch({ type: 'ADD_TODO', payload: todo })
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
