import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';

function List({ list, onControlsClick, component}) {

  const components = {
    item: Item,
    cartItem: CartItem
  }
  const ListItem = components[component]

  const defaultProps = {
    onControlsClick: () => {},
  }


  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <ListItem
            item={item}
            onControlsClick={onControlsClick ? onControlsClick : defaultProps.onControlsClick}
          />
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
  onControlsClick: PropTypes.func,
  component: PropTypes.string,
};

export default React.memo(List);
