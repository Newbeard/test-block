import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {updateEntryFromServer, deleteEntryFromServer} from '../../redux/actions/entries.action'
import  ModalEntry  from '../Modal/ModalEntry'
import { useState } from 'react'



function Entry() {
  const [file, setFile] = useState('')
  const dispatch = useDispatch()
  const { values } = useSelector( state => state.user)
  const { entries } = useSelector(state => state)
 
  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const [isModal, setModal] = useState({ condition:false, entryId: null, entryTitle:null  })

  const handlerClicUpdate = (entryId, entryTitle) =>{
    setModal({condition:true, entryId: entryId, entryTitle:entryTitle})
  }
const onClouseModal = () =>{
  setModal({ condition:false, entryId: null, entryTitle:null  })
}

  const handlerClicUpdateModal = (event) =>{
    event.preventDefault();
    const userId = JSON.parse (localStorage.getItem ("userId"))
    const entryId = event.target.dataset.id;
    const form = event.target;
    const payload = new FormData(form);
    payload.append('entryId', + entryId);
    payload.append('userId', userId);
    payload.append('file', file);
    dispatch(updateEntryFromServer(payload))

    setModal({ condition:false, entryId: null, entryTitle:null  })

  }
  const handlerClickDelete =(event) => {
    const payload ={entryId: +event.target.dataset.id }
    dispatch(deleteEntryFromServer(payload))
  }

  return (
    <>{!entries?
      <></>:
    <div className="uk-margin">
      {entries?.map((entry) => 
      <div key={entry?.id} className="card-list"> 
      <div className="text-card">
      <div className="card-item-attribut">автор: {values?.name}</div>
        <div className="card-item-title">{entry?.title}</div>
        <div className="card-item-attribut">дата: {entry?.createdAt.slice(0,10)}</div>
        <div  className="card-item-btn-box">
          <button className="card-item-btn uk-button uk-button-default" data-id={entry.id} onClick = {(event) => handlerClicUpdate(entry.id, entry.title)} >Update</button>
          <button className="card-item-btn uk-button uk-button-default" data-id={entry.id} onClick = {handlerClickDelete} >Delete</button>
        </div>
      </div>

        <div className="card-item-img-box">
         {(entry?.img.slice(-3).toLowerCase() === 'png' || entry?.img.slice(-3).toLowerCase() ==='jpg')?
          <img className="card-item-img" src={entry?.img} alt="нет файлов" width="100%" height="100%"/>:
          <video width="100%" height="100%" controls="controls"><source src={entry?.img}/></video>
          }
          </div>

      </div>
      )
      }
    </div>}
      {isModal.condition && < ModalEntry onChange={onChange} handlerClicUpdateModal={handlerClicUpdateModal} isModal={isModal} onClouseModal={onClouseModal}/>}
    </>
  );
}

export default Entry;
