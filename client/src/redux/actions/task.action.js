import {INIT_TASK } from '../types'
import axios from "axios";

export const initTask = (task) => ({
  type: INIT_TASK,
  payload: task
})


export const initTaskFromServer = () => async (dispatch) => {
  try {
    const { data } = await axios('/task')
    data.page = 1
    dispatch(initTask(data))
  } catch (error) {
    console.log(error);
  }
}

export const pageTaskFromServer = (payload) => async (dispatch) => {
  try {
    const params = JSON.parse (localStorage.getItem ("params"))
    if(params){
      payload.paramsort1 = params.paramsort1;
      payload.paramsort2 = params.paramsort2;
    }
    const { data } = await axios.post('/task/page',payload)
    data.page = payload.page
    dispatch(initTask(data))
  } catch (error) {
    console.log(error);
  }
}

export const filterTaskFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post('/task', payload)
    localStorage.setItem("params", JSON.stringify(payload))
    data.page = payload.page
    dispatch(initTask(data))
  } catch (error) {
    console.log(error);
  }
}
export const approvedTaskFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.put('/task',payload)
     data.page = payload.page
     dispatch(initTask(data))
  } catch (error) {
    console.log(error);
  }
}

export const newTaskFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post('/task/new',payload)
    data.page = payload.page
    dispatch(initTask(data))
  } catch (error) {
    console.log(error);
  }
}


export const completTaskFromServer = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post('/task/complet',payload)
    data.page = payload.page
    dispatch(initTask(data))
  } catch (error) {
    console.log(error);
  }
}
