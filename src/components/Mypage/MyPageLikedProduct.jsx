import getPbImageURL from '@/utils/getPbImageUrl';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function MyPageLikedProduct({ item }) {
  return (
    <li className="p-1 mb-6 shadow-md bg-white">
      <Link
        to={`/productlist/detail/${item.id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="flex items-center">
          <img
            src={getPbImageURL(item, 'photo')}
            alt="상품"
            className="w-[80px] mr-[20px]"
          />
          <p className="font-medium">
            {item.title}
            <span className="block text-xs mt-[10px]">
              {item.price.toLocaleString('ko-KR')} 원
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}
export default MyPageLikedProduct;

MyPageLikedProduct.propTypes = {
  item: PropTypes.object.isRequired,
};
