import { useLocation } from 'react-router-dom';
import HeaderComp from '@/components/Header/HeaderComp';

function Header() {
  const location = useLocation();
  let title, showLogo, showSearchIcon, showCartIcon, showPrevIcon;

  switch (location.pathname) {
    case '/':
      return null;
    case '/home':
      title = '펫:브릿지';
      showLogo = true;
      showCartIcon = true;
      showSearchIcon = true;
      showPrevIcon = false;
      break;

    case '/cart':
      title = '장바구니';
      showPrevIcon = true;
      break;
    case '/place':
      title = '유기동물 봉사활동';
      showPrevIcon = true;
      break;
    case '/productdetail':
      title = '상품상세정보';
      showPrevIcon = true;
      showCartIcon = true;
      break;
    case '/mypage':
      title = '마이 페이지';
      showPrevIcon = true;
      showCartIcon = true;
      break;
    case '/productlist':
      title = '후원 상품';
      showPrevIcon = true;
      showSearchIcon = true;
      showCartIcon = true;
      break;
    case '/map':
      title = '내 주변 보호소 찾기';
      showPrevIcon = true;
      break;
    case '/search':
      return null;
    case '/signin':
      return null;
    case '/signup':
      return null;
    case '/about':
      return null;
    default:
      title = '상품상세정보';
      showPrevIcon = true;
      showCartIcon = true;
  }

  return (
    <header className="sticky top-0 z-20">
      <HeaderComp
        title={title}
        showLogo={showLogo}
        showSearchIcon={showSearchIcon}
        showCartIcon={showCartIcon}
        showPrevIcon={showPrevIcon}
      />
    </header>
  );
}

export default Header;
