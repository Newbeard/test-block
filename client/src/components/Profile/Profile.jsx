import NewEntry from '../NewEntry/NewEntry'
import Entry from '../Entry/Entry'
import { useSelector, useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {initEntriesFromServer } from '../../redux/actions/entries.action'



export default function Profile(props) {
  const { values } = useSelector( state => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initEntriesFromServer(values.id))
  }, [dispatch])
  
 
  return (
   <>
   <NewEntry/>
   <Entry/>
   </>
);
}



