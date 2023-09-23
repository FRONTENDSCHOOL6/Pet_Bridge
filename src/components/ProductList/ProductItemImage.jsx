import getPbImageURL from '@/utils/getPbImageUrl';
import { PropTypes } from 'prop-types';
import heart_empty_icon from '/assets/icons/heart_empty_icon.svg';
import heart_fill_icon from '/assets/icons/heart_fill_icon.svg';

function ProductItemImage({ product, handleWishBtn, addWish }) {
  return (
    <div className="relative overflow-hidden">
      <img
        src={getPbImageURL(product, 'photo')}
        alt="상품 이미지"
        className="hover:scale-110 w-full h-3/2 rounded-[10px] transition-width duration-300"
      />
      <button
        onClick={handleWishBtn}
        className="p-3 transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-m:top-2 pet-m:right-2 top-[0.1rem] right-[0.1rem]"
      >
        {addWish ? (
          <img
            src={heart_fill_icon}
            alt="찜버튼 활성화"
            className="pet-s:w-5 pet-m:w-8 pet-l:w-9"
          />
        ) : (
          <img
            src={heart_empty_icon}
            alt="찜버튼 비활성화"
            className="pet-s:w-5 pet-m:w-8 pet-l:w-9"
          />
        )}
      </button>
    </div>
  );
}

export default ProductItemImage;

ProductItemImage.propTypes = {
  product: PropTypes.object.isRequired,
  handleWishBtn: PropTypes.func.isRequired,
  addWish: PropTypes.bool.isRequired,
};
