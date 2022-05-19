import React from 'react';

function Modal(prop) {
  return (

    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="modal-close" uk-icon="close" onClick={prop.onClouseModal}></div>
           <div className="modal-title-box">
            <div className="modal-title">{prop.message}</div>
           </div>
        </div>
      </div>
    </div>
    
  );
}

export default Modal;
