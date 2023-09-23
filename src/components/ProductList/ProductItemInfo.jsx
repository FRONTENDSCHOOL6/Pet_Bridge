import { PropTypes } from 'prop-types';
import comment_icon from '/assets/icons/comment_icon.svg';

function ProductItemInfo({ product, selectedCategory, reviewCount }) {
  let productLabels = [];
  if (
    new Date(product.product_date) >= new Date('2023-08-01') &&
    selectedCategory !== '신상품'
  ) {
    productLabels.push('신상품');
  }
  if (product.total_sale > 1200 && selectedCategory !== '베스트') {
    productLabels.push('베스트');
  }
  if (product.delivery_free && selectedCategory !== '무료배송') {
    productLabels.push('무료배송');
  }
  if (productLabels.length === 0) {
    productLabels.push('');
  }

  return (
    <>
      <span className="block text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-300 pet-m:text-base pet-l:text-xl text-[14px] text-pet-black pt-2">
        {product.title}
      </span>
      <span className="-mb-1 pet-m:mb-0 block transition-all duration-300 pet-m:text-sm pet-l:text-lg text-[12px] font-bold text-pet-red pt-1">
        {product.price.toLocaleString('ko-KR')}원
      </span>
      {productLabels.map((label) => {
        let labelClass;
        switch (label) {
          case '신상품':
            labelClass = 'bg-pet-orange';
            break;
          case '베스트':
            labelClass = 'bg-pet-red';
            break;
          case '무료배송':
            labelClass = 'bg-pet-green';
            break;
          default:
            labelClass = '';
        }
        return (
          <span
            key={label}
            className={`mr-1 inline-block px-1 py-[1px] text-[8px] pet-m:text-[14px] rounded-sm font-bold text-pet-bg ${labelClass}`}
          >
            {label}
          </span>
        );
      })}
      <div className="flex gap-1 justify-end pb-1 pt-1 pet-l:gap-2 pet-l:pr-3 pet-l:pb-3">
        <img
          src={comment_icon}
          alt="댓글 수"
          className="transition-all duration-300 w-3 pet-m:w-4 pet-l:w-4"
        />
        <span className="transition-all duration-base text-gray2 text-xs sm:text-sm lg:text-base">
          {reviewCount || '0'}
        </span>
      </div>
    </>
  );
}

export default ProductItemInfo;

ProductItemInfo.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    total_sale: PropTypes.number,
    delivery_free: PropTypes.bool,
    product_date: PropTypes.string,
  }),
  selectedCategory: PropTypes.string,
  reviewCount: PropTypes.number,
};
