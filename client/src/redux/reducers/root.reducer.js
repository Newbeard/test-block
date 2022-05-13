import { combineReducers } from 'redux'
import {taskReducer } from './task.reducer'
import { userReducer} from './user.reducer'

export const rootReducer = combineReducers({
tasks: taskReducer,
user: userReducer,
})
