import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls/index'
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price} ₽
      </div>
      <div className="Item-actions">
        <Controls onAdd={callbacks.onAdd} type={'add'}/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default React.memo(Item);
