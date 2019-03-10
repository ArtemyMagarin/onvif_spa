import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk' 
import logger from 'redux-logger'	
import rootReducer from '../reducers'
import apiMiddleware from '../middleware/apiMiddleware'

export default function configureStore(initialState = {}) {
  const store = createStore(
  	rootReducer, 
  	applyMiddleware(ReduxThunk, apiMiddleware, logger),
  	
  )
  return store
}