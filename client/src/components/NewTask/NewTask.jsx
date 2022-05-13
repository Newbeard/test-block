import React from 'react';
import {newTaskFromServer } from '../../redux/actions/task.action'
import { useDispatch} from 'react-redux'
import  Modal  from '../Modal/Modal'
import { useState } from 'react'

function NewTask(props) {
  const dispatch = useDispatch()
  const [isModal, setModal] = useState(false)
  const onClouseModal = () =>{
    setModal(false)
  }

  const handlerSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const payload = Object.fromEntries(new FormData(form));
  dispatch(newTaskFromServer(payload));
  setModal(true)
}


  return (
    <>
    	<form className="uk-flex" onSubmit={handlerSubmit}>
		
				<div className="uk-inline">
					<input className="uk-input" type="text" id="name" name="name" placeholder="Name" autoComplete="off" required  />
		  	</div>

				<div className="uk-inline">
					<input className="uk-input" id="email" type="email" name="email" placeholder="Email" autoComplete="off" required />
				</div>
			
				<div className="uk-inline">
					<input className="uk-input" id="task" type="text" name="title" placeholder="New task" autoComplete="off" required />
				</div>
			
				<button className="uk-button uk-button-secondary btnNewTask">Add</button>
		  </form>
     {isModal && < Modal onClouseModal={onClouseModal}/>}
      </>  
  );
}

export default NewTask;
