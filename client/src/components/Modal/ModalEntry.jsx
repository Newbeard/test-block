import React from 'react';

function ModalEntry(prop) {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
           <div className="modal-title-box">
             <div className="modal-title">
              <form className="" onSubmit={prop.handlerClicUpdateModal} >
					    	<div className="uk-inline">
					       <input className="uk-input" id="task" type="text" name="newTitle" placeholder={prop.isModal.entryTitle} autoComplete="off" required />
				        </div>
                <div className=" uk-inline">
                <input className="uk-input" id="img" type="file" multiple name="newImg" placeholder="Add file" autoComplete="off" required />
               </div>
                <button className="uk-button uk-button-default" onClick={prop.onClouseModal} type="button">Cancel</button>
			        	<button className="uk-button uk-button-secondary" type="button">Save</button>
		         </form>   
            </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEntry;
