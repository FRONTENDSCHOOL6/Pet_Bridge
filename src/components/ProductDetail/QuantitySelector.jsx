import minus from '/assets/icons/minus_icon.svg';
import plus from '/assets/icons/plus_icon.svg';
import minus_black from '/assets/icons/minus_black_icon.svg';
import { func, number } from 'prop-types';

function QuantitySelector({ count, increaseCount, decreaseCount }) {
  return (
    <div className="flex items-center w-24 h-8 border">
      <button onClick={decreaseCount}>
        <img src={count > 1 ? minus_black : minus} alt="빼기" />
      </button>
      <span className="px-4">{count}</span>
      <button onClick={increaseCount}>
        <img src={plus} alt="추가" />
      </button>
    </div>
  );
}

export default QuantitySelector;

QuantitySelector.propTypes = {
  count: number,
  increaseCount: func,
  decreaseCount: func
}
