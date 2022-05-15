import {INIT_ENTRY } from '../types'
import  api  from '../../utils/axios.config';
import axios from 'axios'

export const initEntry = (task) => ({
  type: INIT_ENTRY,
  payload: task
})


export const initEntriesFromServer = (id) => async (dispatch) => {
  try {
    const id = JSON.parse (localStorage.getItem ("userId"))
    const { data } = await api(`/entries/${id}`)
    dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}


export const updateEntryFromServer = (payload) => async (dispatch) => {
  try {
    const id = JSON.parse (localStorage.getItem ("userId"))
    payload.id =id
    const { data } = await api.put('/entries',payload)
     dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}

export const newEntryFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await api.post('/entries', payload, {headers: {'Content-Type': 'multipart/form-data'}})
    dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}


export const deleteEntryFromServer = (payload) => async (dispatch) => {
  try {
    const userId = JSON.parse (localStorage.getItem ("userId"))
    payload.userId = userId
    const { data } = await api.delete('/entries',{data:payload})
    dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}

