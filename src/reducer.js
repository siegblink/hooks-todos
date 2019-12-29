import uuidv4 from 'uuid/v4'

export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      if (!action.payload) {
        return state
      }
      if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state
      }
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false,
      }
      const addedTodos = [...state.todos, newTodo]
      return { ...state, todos: addedTodos }

    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload,
      }

    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map(function(todo) {
        return todo.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : todo
      })
      return { ...state, todos: toggledTodos }

    case 'UPDATE_TODO':
      const updatedTodo = {
        ...state.currentTodo,
        text: action.payload,
      }
      const updatedTodoIndex = state.todos.findIndex(function(todo) {
        return todo.id === state.currentTodo.id
      })
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ]
      return {
        ...state,
        todos: updatedTodos,
        currentTodo: { id: '', text: '', complete: '' },
      }

    case 'REMOVE_TODO':
      const filteredTodos = state.todos.filter(function(todo) {
        return todo.id !== action.payload.id
      })
      const removedTodo =
        state.currentTodo.id === action.payload.id
          ? { id: '', text: '', complete: '' }
          : state.currentTodo
      return { ...state, todos: filteredTodos, currentTodo: removedTodo }

    default:
      return state
  }
}
