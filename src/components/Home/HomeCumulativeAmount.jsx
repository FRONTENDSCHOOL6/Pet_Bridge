import { useAuth } from '@/contexts/Auth';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CountUp from 'react-countup';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Home_dog from '/assets/imgs/Home_dog.png';

function HomeCumulativeAmount(props) {
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // 로그아웃 핸들러
  const handleSignOut = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setIsLoggingOut(true);

      if (user.verified === true) {
        await kakaoLogout();
        await signOut();
      } else {
        await signOut();
      }

      toast('정상적으로 로그아웃 되었습니다.', {
        position: 'top-right',
        icon: '🐾',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      setIsLoggingOut(false);
    }
  };

  const kakaoLogout = async () => {
    const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;
    const LOGOUT_REDIRECT_URI = 'http://localhost:5173/';
    try {
      location.replace(
        `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}Pet_Bridge/home`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <section className="relative px-5 py-10 bg-primary ">
      <h2 className="font-bold pet-m:text-lg pet-l:text-xl transition-[0.3s]">
        여러분들의 후원으로 이만큼이나 모였어요.
      </h2>

      <span className="text-sm font-semibold">누적후원금액</span>
      <p className="text-xl font-bold ">
        <span className="text-2xl font-black">
          <CountUp start={0} end={props.Amount} duration={2} separator="," />
        </span>
        원
      </p>
      {!user ? (
        <ul className="absolute flex gap-2 right-5 top-5 pet-s:hidden pet-m:flex">
          <li>
            <Link to={`/signin`}>로그인</Link>
          </li>
          <li aria-hidden="true">|</li>
          <li>
            <Link to={`/signup`}>회원가입</Link>
          </li>
        </ul>
      ) : (
        <ul className="absolute flex gap-2 right-5 top-5 pet-s:hidden pet-m:flex">
          <li onClick={handleSignOut}>
            <button>로그아웃</button>
          </li>
        </ul>
      )}
      <div
        className="absolute bottom-0 left-0 w-full h-5 rounded-t-full bg-pet-bg "
        style={{ boxShadow: '0px -12px 12px rgba(0, 0, 0, 0.08)' }}
      >
        <img
          src={Home_dog}
          alt=""
          className="absolute bottom-2 right-[calc(10%-0.4rem)] "
        />
      </div>
    </section>
  );
}

HomeCumulativeAmount.propTypes = {
  Amount: PropTypes.number.isRequired,
};

export default HomeCumulativeAmount;
