import prev_icon from '/assets/icons/prev_icon.svg';
import logo_header_icon from '/assets/icons/logo_header_icon.svg';
import search_icon from '/assets/icons/search_icon.svg';
import cart_on_icon from '/assets/icons/cart_on_icon.svg';
import cart_off_icon from '/assets/icons/cart_off_icon.svg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/Auth';
import { useEffect } from 'react';
import pb from '@/api/pocketbase';
import { useState } from 'react';

function HeaderComp({
  title,
  showLogo,
  showSearchIcon,
  showCartIcon,
  showPrevIcon,
}) {
  const user = useAuth();

  const [isCartFilled, setIsCartFilled] = useState();

  useEffect(() => {
    if (!user || !user.user) return;
    const fetchUserData = async () => {
      try {
        const userData = await pb.collection('users').getOne(user.user.id);
        setIsCartFilled(userData.userCart.length > 0);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && user.user) {
      fetchUserData();
    }
  });

  const navigate = useNavigate();
  const handleGoPrevPage = () => {
    switch (location.pathname) {
      case '/productdetail':
        navigate('/productlist');
        break;
      case '/place':
        navigate('/home');
        break;
      case '/map':
        navigate('place');
        break;
      case '/productlist':
        navigate('/home');
        break;
      default:
        navigate(-1);
    }
  };

  return (
    <>
      <div className="relative p-5 mx-auto border-gray-800 shadow-lg max-w-screen-pet-l bg-pet-bg z-15">
        <div className="flex items-center justify-between">
          <div>
            {showPrevIcon && (
              <button onClick={handleGoPrevPage}>
                <img src={prev_icon} alt="뒤로가기" />
              </button>
            )}
          </div>

          <h1 className="absolute flex items-center gap-1 text-xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {showLogo && (
              <img src={logo_header_icon} alt="로고" className="w-5 h-5" />
            )}
            {title}
          </h1>
          <div className="flex gap-4">
            <Link to="search" onClick={() => window.scrollTo(0, 0)}>
              {showSearchIcon && <img src={search_icon} alt="검색" />}
            </Link>
            <Link to="cart" onClick={() => window.scrollTo(0, 0)}>
              {showCartIcon && (
                <img
                  src={isCartFilled ? cart_on_icon : cart_off_icon}
                  alt="장바구니"
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComp;

HeaderComp.propTypes = {
  title: PropTypes.string,
  showLogo: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  showCartIcon: PropTypes.bool,
  showPrevIcon: PropTypes.bool,
};
