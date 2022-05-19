import { combineReducers } from 'redux'
import {entriesReducer } from './entries.reducer'
import { userReducer} from './user.reducer'

export const rootReducer = combineReducers({
entries: entriesReducer,
user: userReducer,
})
