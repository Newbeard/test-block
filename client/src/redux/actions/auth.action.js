import { REGISTRATION, LOGIN, LOGOUT,  IS_LOADING, IS_ERROR, } from '../types'
import axios from 'axios';
import  api  from '../../utils/axios.config';



export const isLoading = (data) => ({
  type: IS_LOADING,
})

export const isError = (data) => ({
  type: IS_ERROR,
  payload: data

})
export const registration = (data) => ({
  type: REGISTRATION,
  payload: data
})

export const userRegistration = (payload) => async (dispatch) => { 
  dispatch(isLoading())
  try {
    const { data } = await api.post('/authorization/registration', payload )
    if(data.error){
      dispatch(isError(data))
    }
    else{
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken))
    localStorage.setItem("userId",JSON.stringify(data.user.id))
    dispatch(registration(data.user))
    }
  } catch (err) {
    console.log(err);
  }
}


export const login = (data) => ({
  type: LOGIN,
  payload: data
})

export const userLogin = (payload) => async (dispatch) => { 
  dispatch(isLoading())
  try {
    const { data } = await api.post('/authorization/login', payload)
    if(data.error){
      dispatch(isError(data))
    }
    else{
      localStorage.setItem("accessToken",data.accessToken)
      localStorage.setItem("userId",data.user.id)
    dispatch(login(data.user))
  }
  } catch (err) {
    console.log(err);
  }
}

export const logout = (data) => ({
  type: LOGOUT,
})

export const userLogout = (payload) => async (dispatch) => { 
  try {
    await api('/authorization/logout')
    dispatch(logout())
    localStorage.removeItem('accessToken')
  }
   catch (err) {
    console.log(err);
  }
}

export const chekAuth = (payload) => async (dispatch) => { 
  dispatch(isLoading())
  try {
    const { data } = await api.post('/authorization/login', payload)
    if(data.error){
      dispatch(isError(data))
    }
    else{
    localStorage.setItem('tokenData', JSON.stringify( "accessToken", data.accessToken))
    dispatch(login(data.user))
  }
  } catch (err) {
    console.log(err);
  }
}


export const checkAuth = () => async(dispatch) =>{
  try {
      const data = await axios('authorization/refresh', {withCredentials: true})
      localStorage.setItem('accessToken',data.accessToken);
      console.log(data);
      dispatch(login(data.user))
  } catch (err) {
    console.log(err);;
  } 
}

