import React from "react";
import PropTypes from 'prop-types'
import List from '../list/index'
import Controls from '../controls/index'
import './style.css'

function CartModal({cart, onControlsClick, totalCost, onModalClose, isModalOpen}) {

  const defaultProps = {
    onControlsClick: () => {},
    onModalClose: ()=>{}
  }

  function onWrapperClick(e){
    if(e.target.classList.contains('CartModal-wrapper')){
      onModalClose()
    }
  }

  return (
    <>
      {
        isModalOpen &&
        <div className="CartModal">
          <div className="CartModal-wrapper" onClick={onWrapperClick}>
            <div className="Cart-Modal-content">

              <div className="CartModal-header">
                <h1>Корзина</h1>
                <Controls
                  type='closeCart'
                  onClick={onModalClose ? onModalClose : defaultProps.onModalClose}
                />
              </div>

              <div className="CardModal-items">
                <List
                  list={cart}
                  onControlsClick={onControlsClick ? onControlsClick : defaultProps.onControlsClick}
                  controlsType='delete'
                />
              </div>

              <strong className="CartModal-totalCost">
                Итого
                <span>  {totalCost} ₽</span>
              </strong>
            </div>
          </div>
        </div>
      }
    </>
  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      amount: PropTypes.number,
    })
  ).isRequired,
  totalCost: PropTypes.number,
  isModalOpen: PropTypes.bool,
  onControlsClick: PropTypes.func,
  onModalClose: PropTypes.func
}

export default CartModal;