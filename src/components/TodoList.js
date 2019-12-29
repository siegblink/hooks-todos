import React, { useContext } from 'react'
import axios from 'axios'
import TodosContext from '../context'

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext)
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : `Nothing to do`

  return (
    <div className='container max-w-lg mx-auto'>
      <h1 className='font-bold text-gray-700 text-5xl text-center'>{title}</h1>
      <ul className='px-2'>
        {state.todos.map(function(todo) {
          return (
            <li
              key={todo.id}
              className='flex justify-between bg-gray-400 border-black border-dashed border-2 mb-4 py-4 px-3'>
              <span
                onDoubleClick={async () => {
                  const response = await axios.patch(
                    `https://hooks-api.siegblink.now.sh/todos/${todo.id}`,
                    {
                      complete: !todo.complete,
                    }
                  )
                  dispatch({ type: 'TOGGLE_TODO', payload: response.data })
                }}
                className={`font-semibold text-gray-700 cursor-pointer truncate ${todo.complete &&
                  'line-through'}`}>
                {todo.text}
              </span>
              <span>
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
                  }>
                  <img
                    src='https://icon.now.sh/edit/0050c5'
                    alt='Edit icon'
                    className='h-6'
                  />
                </button>
                <button
                  onClick={async () => {
                    axios.delete(
                      `https://hooks-api.siegblink.now.sh/todos/${todo.id}`
                    )
                    dispatch({
                      type: 'REMOVE_TODO',
                      payload: todo,
                    })
                  }}>
                  <img
                    src='https://icon.now.sh/delete/8b0000'
                    alt='Delete icon'
                    className='h-6'
                  />
                </button>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
