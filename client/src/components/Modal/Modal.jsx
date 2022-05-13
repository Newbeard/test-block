import React from 'react';

function Modal({onClouseModal}) {
  return (

    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="modal-close" uk-icon="close" onClick={onClouseModal}></div>
           <div className="modal-title-box">
            <div className="modal-title">Новая задача успешно добавлена.</div>
           </div>
        </div>
      </div>
    </div>
    
  );
}

export default Modal;
