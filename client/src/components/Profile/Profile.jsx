import NewEntry from '../NewEntry/NewEntry'
import Entry from '../Entry/Entry'
import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {initEntriesFromServer } from '../../redux/actions/entries.action'



export default function Profile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initEntriesFromServer())
  }, [dispatch])
  
 
  return (
   <>
   <NewEntry/>
   <Entry/>
   </>
);
}



