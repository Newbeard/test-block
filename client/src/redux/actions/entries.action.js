import {INIT_ENTRY} from '../types'
import  api  from '../../utils/axios.config';

export const initEntry = (data) => ({
  type: INIT_ENTRY,
  payload: data
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
    payload.userId = +id
    const { data } = await api.put('/entries',payload, {headers: {'Content-Type': 'multipart/form-data'}})
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

