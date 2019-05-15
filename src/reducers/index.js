import { combineReducers } from 'redux'
import dashboardReducer from './dashboardReducer'
import testReducer from './testReducer'
import userReducer from './userReducer'
import databaseReducer from './databaseReducer'

export default combineReducers({
    dashboardReducer,
    testReducer,
    userReducer,
    databaseReducer
})