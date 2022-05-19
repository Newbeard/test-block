import React from 'react';

function ModalEntry(prop) {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
           <div className="modal-title-box">
             <div className="modal-title-box">
              <form data-id={prop.isModal.entryId} className="modal-entry-form" onSubmit={prop.handlerClicUpdateModal} >
					    	<div className="uk-inline modal-entry-form-input">
					       <textarea className="uk-input" id="task" type="text" name="newTitle" placeholder={prop.isModal.entryTitle} autoComplete="off" required />
				        </div>
                <div className=" uk-inline modal-entry-form-input">
                <input onChange={prop.onChange} className="uk-input" id="newImg" type="file" multiple name="newImg" placeholder="Add file" autoComplete="off" required />
               </div>
               <div className="modale-entry-form-boxbtn">
                <button className="uk-button uk-button-default model-entry-form-btn" onClick={prop.onClouseModal} type="button">Cancel</button>
			        	<button className="uk-button uk-button-secondary"  >Save</button>
                </div>
		         </form>   
            </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEntry;
