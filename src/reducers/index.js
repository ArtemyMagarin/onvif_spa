import { combineReducers } from 'redux'
import dashboardReducer from './dashboardReducer'
import testReducer from './testReducer'

export default combineReducers({
    dashboardReducer,
    testReducer
})