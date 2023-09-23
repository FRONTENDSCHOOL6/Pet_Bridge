import home from '/assets/icons/home2_icon.svg';
import shop from '/assets/icons/shop2_icon.svg';
import map from '/assets/icons/map2_icon.svg';
import myPage from '/assets/icons/mypage2_icon.svg';
import home2 from '/assets/icons/home_icon.svg';
import shop2 from '/assets/icons/shop_icon.svg';
import map2 from '/assets/icons/map_icon.svg';
import myPage2 from '/assets/icons/mypage_icon.svg';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  // '/place', '/map', '/productlist', '/productdetail' 경로에 진입했다면 
  // 각각의 localStorage 값들을 설정합니다.
  if (['/place', '/map'].includes(location.pathname)) {
    localStorage.setItem('visitedPlaceOrMap', 'true');
  }
  
  if (['/productlist', '/productdetail'].includes(location.pathname)) {
    localStorage.setItem('visitedProductListOrDetail', 'true');
  }

  if (['/', '/home'].includes(location.pathname)) {
    localStorage.setItem('visitedHome', 'true');
  }

  const getIcon = (paths, activeIcon, defaultIcon) => {
    // 각각의 경로에서 해당하는 localStorage 값에 따라서 다른 아이콘을 반환합니다.
    return paths.includes(location.pathname)
      ? ((paths.includes('/place') || paths.includes('/map')) && localStorage.getItem('visitedPlaceOrMap'))
        || ((paths.includes('/productlist') || paths.includes('/productdetail')) && localStorage.getItem('visitedProductListOrDetail'))
        || ((paths.includes('/home') || paths.includes('/mypage')) && localStorage.getItem('visitedHome'))
        ? activeIcon
        : defaultIcon
      : defaultIcon;
   };

  return (
    <>
      <nav className="max-w-screen-pet-l h-[60px] z-10 bg-pet-bg px-[28px] py-5 bottom-0 fixed left-0 right-0 m-auto shadow-[0_-8px_20px_0_rgba(0,0,0,0.1)]">
        <div className='flex justify-around'>
          <h2 className='sr-only'>네비게이션</h2>
          <Link to="/home" onClick={() => window.scrollTo(0, 0)}>
            <h3><img src={getIcon(['/home', '/home'], home2, home)} alt="메인" /></h3>
          </Link>
          <Link to="/productlist" onClick={() => window.scrollTo(0, 0)}>
            <h3><img src={getIcon(['/productlist', '/productdetail/'], shop2, shop)} alt="상점" /></h3>
          </Link>
          <Link to="/place" onClick={() => window.scrollTo(0, 0)}>
            <h3><img src={getIcon(['/place', '/map'], map2, map)} alt="장소" /></h3>
          </Link>
          <Link to="/mypage" onClick={() => window.scrollTo(0, 0)}>
            <h3><img src={getIcon(['/mypage', '/mypage'], myPage2, myPage)} alt="마이페이지" /></h3>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;