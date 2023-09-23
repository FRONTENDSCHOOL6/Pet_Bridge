import { useLocation } from 'react-router-dom';
import logo from '/assets/icons/logo_footer_icon.svg';
import GoTopButton from '@/components/Footer/GoTopBuootn';

function Footer() {
  const location = useLocation();

  switch (location.pathname) {
    case '/':
    case '/map':
      return null;

    default:
  }
  return (
    <footer className="pt-10 mx-auto bg-pet-bg max-w-screen-pet-l">
      <GoTopButton />
      <div className="flex flex-col gap-6 pt-6 text-xs text-center font-suit text-pet-black bg-gray-1">
        <p>
          <span className="font-semibold">COMPANY:</span> 펫브릿지스튜디오{' '}
          <br />
          <span className="font-semibold">ADDRESS:</span> 서울 종랑구 연목로
          42길 11 (럭키빌딩) 306호 <br />
          <span className="font-semibold">
            BUSINESS NUMBER:
          </span> 010-0000-0000 <br />
          <span className="font-semibold">CONTACT:</span> catdog141000@gmail.com
        </p>
        <p>
          Copyright ⓒ 2023 동물의 삶을 더 밝게, 유기동물스튜디오 <br />
          All rights reserved.
        </p>
        <div className="flex items-center justify-center py-3 pb-16 text-xl font-bold bg-gray-2 text-gray-1">
          <img src={logo} alt="펫브릿지 로고" className="w-5 m-1"></img>
          펫:브릿지
        </div>
      </div>
    </footer>
  );
}

export default Footer;
