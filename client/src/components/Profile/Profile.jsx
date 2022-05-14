import NewEntry from '../NewEntry/NewEntry'
import Entry from '../Entry/Entry'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import {initEntriesFromServer } from '../../redux/actions/entries.action'


export default function Profile(props) {
  const dispatch = useDispatch();
  const { values } = useSelector( state => state.user)
  const { entries } = useSelector((state) => state)
  
  useEffect(() => {
    dispatch(initEntriesFromServer(values?.id))
  }, [dispatch])

  return (
    
   <>
   {values?.id &&
     <div className="">
     <NewEntry/>
     <Entry entries={ entries }/>
     </div>
   }
 
   </>
);
}



