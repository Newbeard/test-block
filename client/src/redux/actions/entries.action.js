import {INIT_ENTRY } from '../types'
import axios from "axios";

export const initEntry = (task) => ({
  type: INIT_ENTRY,
  payload: task
})


export const initEntriesFromServer = (id) => async (dispatch) => {
  try {
    const id = JSON.parse (localStorage.getItem ("userId"))
    const { data } = await axios(`/entries/${id}`)
    dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}


export const updateEntryFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.put('/entries',payload)
     data.page = payload.page
     dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}

export const newEntryFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post('/entries',payload)
    data.page = payload.page
    dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}


export const deleteEntryFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.delete('/entries',payload)
    data.page = payload.page
    dispatch(initEntry(data))
  } catch (error) {
    console.log(error);
  }
}
