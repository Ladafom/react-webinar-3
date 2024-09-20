import React from "react";
import PropTypes from 'prop-types'
import List from '../list/index'
import './style.css'

function CartModal({cart, onControlsClick, totalCost,}) {

  return (
    <>
      <div className="CardModal-items">
        <List
          list={cart}
          onControlsClick={onControlsClick ? onControlsClick : defaultProps.onControlsClick}
          isCart={true}
        />
      </div>

      <strong className="CartModal-totalCost">
        Итого
        <span>  {totalCost.toLocaleString("ru-RU")} ₽</span>
      </strong>
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
  onControlsClick: PropTypes.func,
}

export default React.memo(CartModal);