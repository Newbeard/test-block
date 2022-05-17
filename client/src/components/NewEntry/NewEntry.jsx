import React from 'react';
import {newEntryFromServer } from '../../redux/actions/entries.action'
import { useDispatch} from 'react-redux'
import  Modal  from '../Modal/Modal'
import { useState } from 'react'

function NewEntry (props) {
  const message = 'Новая запись успешно добавлена'
  const [file, setFile] = useState('')
  const dispatch = useDispatch()
  const [isModal, setModal] = useState(false)
  const onClouseModal = () =>{
    setModal(false)
  }

  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const handlerSubmit = (event) => {
  event.preventDefault();
  const userId = JSON.parse (localStorage.getItem ("userId"))
  const form = event.target;
  const payload = new FormData(form);
  payload.append('userId', userId);
  payload.append('file', file);
  console.log(payload);
  dispatch(newEntryFromServer(payload));
  setModal(true)
}


  return (
    <>
    	<form className="uk-flex" onSubmit={handlerSubmit}>
						<div className="uk-inline">
					<input className="uk-input" id="task" type="text" name="title" placeholder="New entry" autoComplete="off" required />
				</div>
        <div className=" uk-inline">
        <input onChange={onChange} className="uk-input" id="img" type="file" multiple name="img" placeholder="Add file" autoComplete="off" required />
        </div>
				<button className="uk-button uk-button-secondary btnNewTask">Add</button>
		  </form>
     {isModal && < Modal onClouseModal={onClouseModal} message={message}/>}
      </>  
  );
}

export default NewEntry ;
