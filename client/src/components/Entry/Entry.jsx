import React, {useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {updateEntryFromServer, deleteEntryFromServer } from '../../redux/actions/entries.action'



function Entry({entries}) {
  const dispatch = useDispatch()
  const { values } = useSelector( state => state.user)

  useEffect(() => {
  },[])


  const handlerClicUpdate = (id) =>{
    const payload ={id};
    console.log(payload);
    dispatch(updateEntryFromServer(payload))

  }
  const handlerClickDelete =(event) => {
    const payload ={entryId: +event.target.dataset.id }
    dispatch(deleteEntryFromServer(payload))
  }

  return (
    <>
    <div className="tasks uk-margin">
      {entries?.map((entry) => 
      <div key={entry?.id} className="card-list"> 
        <div className="card-item-name">{values?.name}</div>
        <div className="card-item">{entry?.title}</div>
        <div className="card-item-title">{entry?.createdAt.slice(0,10)}</div>
        <div  className="card-item card-item-btn-box">
          <button className="card-item-btn" data-id={entry.id} onClick = {(e) => handlerClicUpdate(entry.id, entry.title)} >Update</button>
          <button className="card-item-btn" data-id={entry.id} onClick = {handlerClickDelete} >Delete</button>
        </div>
      </div>
      )
      }
    </div>
    </>
  );
}

export default Entry;
