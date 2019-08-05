import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  visibilityFilter
})

export default todoApp
