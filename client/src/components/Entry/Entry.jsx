import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {updateEntryFromServer, deleteEntryFromServer } from '../../redux/actions/entries.action'
import  ModalEntry  from '../Modal/ModalEntry'
import { useState } from 'react'



function Entry() {
  const dispatch = useDispatch()
  const { values } = useSelector( state => state.user)
  const { entries } = useSelector(state => state)

  const [isModal, setModal] = useState({ condition:false, entryId: null, entryTitle:null  })

  const handlerClicUpdate = (entryId, entryTitle) =>{
    setModal({condition:true, entryId: entryId, entryTitle:entryTitle})
    console.log(isModal.condition);
  }
const onClouseModal = () =>{
  setModal({ condition:false, entryId: null, entryTitle:null  })
}

  const handlerClicUpdateModal = () =>{
    // dispatch(updateEntryFromServer())

  }
  const handlerClickDelete =(event) => {
    const payload ={entryId: +event.target.dataset.id }
    dispatch(deleteEntryFromServer(payload))
  }

  return (
    <>{!entries?
      <></>:
    <div className="tasks uk-margin">
      {entries?.map((entry) => 
      <div key={entry?.id} className="card-list"> 
        <div className="card-item-name">{values?.name}</div>
        <div className="card-item-title">{entry?.title}</div>
        <div className="card-item">{entry?.createdAt.slice(0,10)}</div>
        <div className="card-item-title">
         {(entry?.img.slice(-3).toLowerCase() === 'png' || entry?.img.slice(-3).toLowerCase() ==='jpg')?
          <img src={entry?.img} alt="нет файлов" width="200px" height="200px"/>:
          <video width="200" height="200" controls="controls"><source src={entry?.img}/></video>
          }
          </div>
        <div  className="card-item card-item-btn-box">
          <button className="card-item-btn" data-id={entry.id} onClick = {(e) => handlerClicUpdate(entry.id, entry.title)} >Update</button>
          <button className="card-item-btn" data-id={entry.id} onClick = {handlerClickDelete} >Delete</button>
        </div>
      </div>
      )
      }
    </div>}
      {isModal.condition && < ModalEntry handlerClicUpdateModal={handlerClicUpdateModal} isModal={isModal} onClouseModal={onClouseModal}/>}
    </>
  );
}

export default Entry;
