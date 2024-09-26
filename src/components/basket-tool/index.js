import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

function BasketTool({ sum, amount, onOpen }) {

  const store = useStore();
  const translator = store.actions.language

  const select = useSelector(state => ({
    lang: state.language.lang,
  }));

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('link')}> {translator.translate('linkHome')} </Link>
      <span className={cn('label')}>{translator.translate('inCart')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: translator.translate('oneItem'),
              few: translator.translate('fewItems'),
              many: translator.translate('manyItems'),
            })} / ${numberFormat(sum)} ₽`
          : translator.translate('cartEmpty')}
      </span>
      <button onClick={onOpen}>{translator.translate('buttonToCart')}</button>
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
