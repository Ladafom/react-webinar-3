import React from "react";
import PropTypes from 'prop-types'
import Controls from '../controls/index'
import './style.css'

function Modal({children, modalHeader, onModalClose, isModalOpen}) {

  const defaultProps = {
    onModalClose: ()=>{}
  }

  function onWrapperClick(e){
    if(e.target.classList.contains('Modal-wrapper')){
      onModalClose()
    }
  }

  return (
    <>
      {
        isModalOpen &&
        <div className="Modal">
          <div className="Modal-wrapper" onClick={onWrapperClick}>
            <div className="Modal-content">

              <div className="Modal-header">
                <h1>{modalHeader}</h1>
                <Controls
                  type='closeModal'
                  onClick={onModalClose ? onModalClose : defaultProps.onModalClose}
                />
              </div>

              {children}

            </div>
          </div>
        </div>
      }
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  modalHeader: PropTypes.string,
  isModalOpen: PropTypes.bool,
  onModalClose: PropTypes.func
}

export default React.memo(Modal);