import { push } from 'connected-react-router'
import axios from '../services/axios'
import actionTypes from './actionTypes'

export const fetchQuestions = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/questions')
    dispatch({ type: actionTypes.QUESTIONS_FETCH_ALL, payload: data.reverse() })
  } catch (err) {
    console.log(err)
  }
}

export const createQuestion = text => async (dispatch) => {
  try {
    const { data } = await axios.post('/questions', { text })
    dispatch({ type: actionTypes.QUESTIONS_CREATE, payload: data })
    dispatch(push('/'))
  } catch (err) {
    console.log(err)
  }
}