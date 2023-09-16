import comment_icon from '/assets/icons/comment_icon.svg';
import heart_empty_icon from '/assets/icons/heart_empty_icon.svg';
import heart_fill_icon from '/assets/icons/heart_fill_icon.svg';
import { useState } from 'react';
import getPbImageURL from '@/utils/getPbImageUrl';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import { useEffect } from 'react';

function ProductItem({ product, reviewCount }) {
  const { user } = useAuth();
  const [addWish, setAddWish] = useState(false);

  useEffect(() => {
    // 로그인 안했으면 바로 반환
    if (!user) return;
    // 포켓베이스에서 product 데이터 가져옴
    const fetchProductData = async () => {
      try {
        const productList = await pb.collection('product').getOne(product.id);
        if (productList.Liked.includes(user.id)) {
          setAddWish(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductData();
  }, user?.id);

  const handleWishBtn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      const productData = await pb.collection('product').getOne(product.id);
      let updatedLikedUsers;

      // 하트버튼이 눌렸을 때 기존 찜목록에 추가로 상품 추가
      if (!addWish) {
        updatedLikedUsers = [...productData.Liked, user.id];
        setAddWish(true);
      } else {
        // 하트가 취소된 상태이면
        updatedLikedUsers = productData.Liked.filter(
          (userId) => userId !== user.id
        );
        setAddWish(false);
      }
      await pb
        .collection('product')
        .update(product.id, { Liked: updatedLikedUsers });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="bg-[#FDF6EE] rounded-[10px] pet-s:w-[calc(50%/1-0.25rem)] pet-l:w-[calc(33.3%-0.33rem)] aspect-200/140">
      <Link
        to={`/productlist/detail/${product.id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="flex-col items-center justify-center pt-3 px-3">
          <div className="relative">
            <img
              src={getPbImageURL(product, 'photo')}
              className="=w-full h-3/2 rounded-[10px] transition-width duration-300"
            />
            {addWish ? (
              <img
                src={heart_fill_icon}
                onClick={handleWishBtn}
                className="transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-m:w-8 pet-m:top-4 pet-m:right-3 pet-l:w-10 pet-l:top-7 pet-l:right-6 top-[0.75rem] right-[0.75rem]"
              />
            ) : (
              <img
                src={heart_empty_icon}
                onClick={handleWishBtn}
                className="transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-m:w-8 pet-m:top-4 pet-m:right-3 pet-l:w-10 pet-l:top-7 pet-l:right-6 top-[0.75rem] right-[0.75rem]"
              />
            )}
          </div>
          <span className="block text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-300 pet-m:text-base pet-l:text-xl text-[12px] text-pet-black pt-2">
            {product.title}
          </span>
          <span className="block transition-all duration-300 pet-m:text-sm pet-l:text-lg text-[10px] font-bold text-pet-red pt-1">
            {product.price.toLocaleString('ko-KR')}원
          </span>
          <div className="flex gap-1 justify-end pb-1 pt-2 pet-l:gap-2 pet-l:pr-3 pet-l:pb-3">
            <img
              src={comment_icon}
              className="transition-all duration-300 w-3 pet-m:w-4 pet-l:w-4"
            />
            <span className="transition-all duration-base text-gray2 text-xs sm:text-sm lg:text-base">
              {reviewCount || '0'}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
  reviewCount: PropTypes.number,
};
