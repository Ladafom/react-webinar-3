import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils'
import './style.css';
import Controls from '../controls';

function Cart({ cart, totalCost}) {

  return (
    <div className="Cart">
      <div>
        В корзине:
        <strong>
          {
            cart.length ?
            ` ${cart.length} ${plural(cart.length, {
                                                  one: 'товар',
                                                  few: 'товара',
                                                  many: 'товаров',
            })} / ${totalCost} ₽`
            :
            ' пусто'
          }
        </strong>
      </div>
      <Controls type={'cart'}/>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      amount: PropTypes.number,
    }),
  ).isRequired,
  totalCost: PropTypes.number,
};

export default React.memo(Cart);
