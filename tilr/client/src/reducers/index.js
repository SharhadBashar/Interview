import { combineReducers } from 'redux'
import questions from './questions'
import { connectRouter } from 'connected-react-router'

const reducers = history => combineReducers({
  questions,
  router: connectRouter(history)
})

export default reducers
