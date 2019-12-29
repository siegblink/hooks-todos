import React, { useContext, useReducer } from 'react'
import { UserContext } from './index'

const initialState = {
  count: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
      }
    case 'decrement':
      return {
        count: state.count - 1,
      }
    case 'reset':
      return initialState
    default:
      return initialState
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useContext(UserContext)
  return (
    <div className='mt-4 ml-4'>
      Count: {state.count}
      <button
        onClick={() => dispatch({ type: 'increment' })}
        className='ml-4 border border-gray-500 py-1 px-2 rounded'>
        Increment
      </button>
      <button
        onClick={() => dispatch({ type: 'decrement' })}
        className='ml-4 border border-gray-500 py-1 px-2 rounded'>
        Decrement
      </button>
      <button
        onClick={() => dispatch({ type: 'reset' })}
        className='ml-4 border border-gray-500 py-1 px-2 rounded'>
        Reset
      </button>
    </div>
  )
}
