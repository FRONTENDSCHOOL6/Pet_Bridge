import getPbImageURL from '@/utils/getPbImageUrl';
import remove from '/assets/icons/close_icon.svg';
import minus_black from '/assets/icons/minus_black_icon.svg';
import plus from '/assets/icons/plus_icon.svg';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function CartItem({ item, count, index, removeItem, decreaseCount, increaseCount }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div key={item.id} className="h-auto bg-white rounded-xl mb-6 shadow-[4px_4px_8px_0_rgba(0,0,0,0.16)]">
      <div className="px-4 py-5 flex justify-start relative">
        <img src={getPbImageURL(item.expand.productId)} alt="상품" className="w-14 h-14 bg-black" />
        <div className="pl-4">
          <div className={isMobile ? 'w-56' : 'w-auto'}>
            <div className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">{item.expand.productId.title}</div>
            <div className="text-lg">
              {(item.expand.productId.price * count).toLocaleString('ko-KR')} 원
            </div>
          </div>
          <button className="absolute top-4 right-4" onClick={() => removeItem(index)}>
            <img src={remove} alt="제거버튼" />
          </button>
          <div className="absolute right-4 top-12">
            <div className="flex items-center border">
              <button onClick={() => decreaseCount(index)}>
                <img src={count > 1 ? minus_black : minus_black} alt="빼기" />
              </button>
              <span className="px-3">{count}</span>
              <button onClick={() => increaseCount(index)}>
                <img src={plus} alt="추가" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  decreaseCount: PropTypes.func.isRequired,
  increaseCount: PropTypes.func.isRequired, 
};