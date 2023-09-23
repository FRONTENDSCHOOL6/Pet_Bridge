import { useState, useEffect } from 'react';
import click from '/assets/icons/heart_click_icon.svg';
import unclick from '/assets/icons/heart_unclick_icon.svg';
import pb from '@/api/pocketbase'; // 포켓베이스 API import
import { useAuth } from '@/contexts/Auth'; // Auth context import
import { PropTypes } from 'prop-types';
import toast from 'react-hot-toast';

function Heart({ productId }) {
  const [addWish, setAddWish] = useState(false);
  const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기

  useEffect(() => {
    if (!user) return;

    const fetchProductData = async () => {
      try {
        const userData = await pb.collection('users').getOne(user.id);
        setAddWish(userData.LikedProducts.includes(productId));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, [productId, user?.id]);

  const handleWishBtn = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userData = await pb.collection('users').getOne(user.id);
      let updatedLikedUsers;

      if (addWish) {
        updatedLikedUsers = userData.LikedProducts.filter(
          (id) => id !== productId
        );
         // 찜하기 취소 알림
      toast('찜한 상품이 해제되었습니다.', {
        position: 'top-right',
        icon: '💔',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      } else {
        updatedLikedUsers = [...userData.LikedProducts, productId];
        // 찜하기 추가 알림
      toast('찜한 상품에 추가되었습니다.', {
        position: 'top-right',
        icon: '💖',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      }

      await pb
        .collection('users')
        .update(user.id, { LikedProducts: updatedLikedUsers });

      setAddWish(!addWish);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button id='productLike' className='flex w-7 h-7'>
      {addWish ? (
        <img id='like' src={click} onClick={handleWishBtn} />
      ) : (
        <img id='likeCancel' src={unclick} onClick={handleWishBtn} />
      )}
    </button>
  );
}

export default Heart;

Heart.propTypes = {
  productId: PropTypes.string.isRequired,
};