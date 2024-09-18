import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils'
import './style.css';
import Controls from '../controls';

function Cart({ cartLength, totalCost, onControlsClick}) {

  return (
    <div className="Cart">
      <div>
        В корзине:
        <strong>
          {
            cartLength !== 0?
            ` ${cartLength} ${plural(cartLength, {
                                                  one: 'товар',
                                                  few: 'товара',
                                                  many: 'товаров',
            })} / ${totalCost} ₽`
            :
            ' пусто'
          }
        </strong>
      </div>
      <Controls type={'openCart'} onClick={onControlsClick}/>
    </div>
  );
}

Cart.propTypes = {
  cartLength: PropTypes.number,
  totalCost: PropTypes.number,
  onControlsClick: PropTypes.func
};

export default React.memo(Cart);
