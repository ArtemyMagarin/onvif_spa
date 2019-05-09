import { combineReducers } from 'redux'
import dashboardReducer from './dashboardReducer'
import testReducer from './testReducer'
import authReducer from './authReducer'
import databaseReducer from './databaseReducer'

export default combineReducers({
    dashboardReducer,
    testReducer,
    authReducer,
    databaseReducer
})