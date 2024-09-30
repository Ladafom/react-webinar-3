import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import HomeLink from '../home-link';
import './style.css';

function BasketTool({ sum, amount, onOpen, basketToolContent, homeLinkContent }) {

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <HomeLink homeLinkContent={homeLinkContent}/>
      <span className={cn('label')}>{basketToolContent.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: basketToolContent.oneItem,
              few: basketToolContent.fewItems,
              many: basketToolContent.manyItems,
            })} / ${numberFormat(sum)} ₽`
          : basketToolContent.cartEmpty }
      </span>
      <button onClick={onOpen}>{basketToolContent.buttonToCart}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
