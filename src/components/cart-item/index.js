import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls/index'
import './style.css';
import '../item/style.css'

function CartItem(props) {

  const callbacks = {
    onClick: () => {
      props.onControlsClick(props.item.code);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
      </div>
      <div className='CardItem-info'>
        <div>
          {props.item.price.toLocaleString("ru-RU")} ₽
        </div>
          <div>
          {props.item.amount} шт
        </div>
      </div>
      <div className="Item-actions">
        <Controls onClick={callbacks.onClick} type='delete'/>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onControlsClick: PropTypes.func,
  controlsType: PropTypes.string
};

export default React.memo(CartItem);
