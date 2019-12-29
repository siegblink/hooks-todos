export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload
      }

    case 'ADD_TODO':
      const addedTodos = [...state.todos, action.payload]
      return { ...state, todos: addedTodos }

    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload,
      }

    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map(function(todo) {
        return todo.id === action.payload.id
          ? { ...todo, ...action.payload }
          : todo
      })
      return { ...state, todos: toggledTodos }

    case 'UPDATE_TODO':
      const updatedTodo = {
        ...state.currentTodo,
        ...action.payload,
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
