import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls/index'
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: () => {
      props.onControlsClick(props.item);
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
      {
        props.controlsType === 'delete' &&
        <div className='Item-amount'>
        {props.item.amount} шт
      </div>
      }
      <div className="Item-actions">
        <Controls onClick={callbacks.onClick} type={props.controlsType}/>
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
  onControlsClick: PropTypes.func,
  controlsType: PropTypes.string
};

export default React.memo(Item);
