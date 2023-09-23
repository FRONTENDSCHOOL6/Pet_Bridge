import useProductItem from '@/utils/useProductItem';
import { useParams, Link } from 'react-router-dom';
import getPbImageURL from '@/utils/getPbImageUrl';
import Heart from '@/components/ProductDetail/Heart';
import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import toast from 'react-hot-toast';
import Navigation from '@/components/ProductDetail/Navigation';
import QuantitySelector from '@/components/ProductDetail/QuantitySelector';
import ReviewItem from '@/components/ProductDetail/ReviewItem';

function ProductDetail() {
  const { user } = useAuth();
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);

  // * 상품 수량 관리
  const [quantity, setQuantity] = useState(1);

  // * 수량 증가 함수
  const increaseCount = () => {
    setQuantity(quantity + 1);
  };

  // * 수량 감소 함수
  const decreaseCount = () => {
    if (quantity > 1) {
      // 최소 1개 이상이어야 함.
      setQuantity(quantity - 1);
    }
  };

  // * 장바구니 담기
  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      try {
        // userCart 컬렉션에서 사용자 관련 레코드들 가져온다.
        const cartData = await pb
          .collection('userCart')
          .getFullList(`userName="${user.name}"`);
        const relatedCarts = cartData.filter(
          (item) => item.userName === user.name
        );
        console.log(relatedCarts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [user?.id]);

  // * 장바구니 저장
  const handleAddCart = async () => {
    if (!user) {
      toast('로그인이 필요합니다.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }
    try {
      // 현재 사용자의 모든 장바구니 아이템 가져오기
      const userCartItems = await pb
        .collection('userCart')
        .getFullList(`userId="${user.id}"`);

      // 선택한 상품이 이미 있는지 확인하기 (현재 사용자에 한함)
      const existingCartItem = userCartItems.find(
        (item) => item.productId === data.id && item.userId === user.id
      );

      // 만약 이미 존재한다면, 토스트 메시지 띄우고 함수 종료
      if (existingCartItem) {
        toast('이미 추가된 상품입니다.', {
          position: 'top-right',
          icon: '🚨',
          ariaProps: {
            role: 'alert',
            'aria-live': 'polite',
          },
        });
        return;
      }

      const newCartData = await pb.collection('userCart').create({
        userId: user.id,
        userName: user.name,
        productId: data.id,
        quantity: quantity,
      });

      console.log(newCartData);

      const expandedCartData = await pb
        .collection('userCart')
        .getFullList(`userName="${user.name}"`);
      console.log(expandedCartData);

      // ! 코드 새로 추가 (헤더 아이콘용)------------------------
      const cartData = await pb
        .collection('userCart')
        .getFullList(`userName="${user.name}"`);
      const relatedCarts = cartData.filter(
        (item) => item.userName === user.name
      );
      let userRelatedCarts = relatedCarts.map((item) => item.id);
      await pb
        .collection('users')
        .update(user.id, { userCart: userRelatedCarts });
      // ! 여기 까지-----------------------------------
      toast('상품이 추가되었습니다.', {
        position: 'top-right',
        icon: '🛒',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-pet-l m-auto pt-3 px-5">
      <img
        id="productDescription"
        src={getPbImageURL(data, 'photo')}
        alt="상품사진"
        className="m-auto h-auto"
      />
      <div className="flex justify-between">
        <div className="text-xl pt-5">{data.title}</div>
        <div className="flex mt-5">
          <Heart productId={productTitle} />
          <div className="ml-4">
            <QuantitySelector
              quantity={quantity}
              increaseCount={increaseCount}
              decreaseCount={decreaseCount}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between pb-4">
        {data.price ? (
          <div className="text-lg mt-4">
            {data.price.toLocaleString('ko-KR')} 원
          </div>
        ) : (
          <div className="text-xl pt-5">가격 정보 없음</div>
        )}
        <button id='addCart'
          onClick={handleAddCart}
          className="bg-primary w-32 h-9 rounded-xl mt-3"
        >
          장바구니 추가
        </button>
      </div>
      <h2 className="sr-only">상세페이지 네비</h2>
      <Navigation />
      <h2 className="sr-only">상세정보 이미지</h2>
      <img
        id="productDetails"
        src={getPbImageURL(data, 'photo_detail')}
        className="m-auto py-4 border-b"
        alt="상품사진"
      />
      <h2 className="text-2xl my-3 mx-4 bg-pet-bg">리뷰</h2>
      <ReviewItem />
      <Link to={`/cart`} onClick={() => window.scrollTo(0, 0)}>
        <button className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0 sticky">
          장바구니
        </button>
      </Link>
    </div>
  );
}

export default ProductDetail;