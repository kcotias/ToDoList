import { combineReducers } from 'redux'
import {
  ADD_TODO,
  REMOVE_TODO,
  CHANGE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      console.log(action.filter);
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case REMOVE_TODO:{
          let newState = state.slice();
          newState.splice(action.index, 1);
          return newState;
    }
    case ADD_TODO:{
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          isInEdit: false
        }
      ]}
    
    case CHANGE_TODO:{
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            text: action.text,
          })
        }
        return todo
      })}

    case EDIT_TODO: {
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            isInEdit: !todo.isInEdit
          })
        }
        return todo
      })}

    case TOGGLE_TODO:{
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })}
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp