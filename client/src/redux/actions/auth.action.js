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
    localStorage.setItem("name",data.user.name)
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
      localStorage.setItem("name",data.user.name)
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
    localStorage.removeItem("userId")
    await api('/authorization/logout')
    dispatch(logout())
    localStorage.removeItem('accessToken')
    localStorage.removeItem("userId")
    localStorage.removeItem("name")
  }
   catch (err) {
    console.log(err);
  }
}

export const initUser = () => (dispatch) => {
  const payload = {id: +localStorage.getItem('userId'), name: localStorage.getItem("name")}
      dispatch(registration(payload))
} 

export const checkAuth = () => async(dispatch) =>{
  try {
      const {data} = await axios('authorization/refresh', {withCredentials: true})
      localStorage.setItem('accessToken', data.accessToken);
      dispatch(login(data.user))
  } catch (err) {
    console.log(err);;
  } 
}

