import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';

function List({ list, onControlsClick, cartLength, isCart}) {

  const defaultProps = {
    onControlsClick: () => {},
  }

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {
            isCart ?
            <CartItem
              item={item}
              onControlsClick={onControlsClick ? onControlsClick : defaultProps.onControlsClick}
              cartLength={cartLength}
            />
            :
            <Item
              item={item}
              onControlsClick={onControlsClick ? onControlsClick : defaultProps.onControlsClick}
              cartLength={cartLength}
            />
          }
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  isCart:PropTypes.bool,
  cartLength: PropTypes.number,
  onControlsClick: PropTypes.func,
};

export default React.memo(List);
