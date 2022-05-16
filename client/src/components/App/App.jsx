import './App.css'
import { Routes, Route } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Registration from '../Registration/Registration'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import Home from '../Home/Home'
import React, {useEffect} from 'react';
import {checkAuth, initUser } from '../../redux/actions/auth.action'
import { useDispatch, useSelector} from 'react-redux'
import {initEntriesFromServer } from '../../redux/actions/entries.action'





function App() {
  const { values } = useSelector( state => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('accessToken')){
    dispatch(checkAuth())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initEntriesFromServer(values.id))
  }, [dispatch])
  

  return (
    <>
			<div className="wrapper">
				<header className="header">
					<Nav />
				</header>
         <main className="uk-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile/>} />
						<Route path="/registation" element={<Registration />} />
						<Route path="/login" element={<Login />} />
          </Routes>
         </main>

        <footer>
          
        </footer>
      </div>
    </>
  );
}

export default App;
