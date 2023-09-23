import { useAuth } from '@/contexts/Auth';
import { useState } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import index_1 from '/assets/imgs/Index_1.png';
import index_2 from '/assets/imgs/Index_2.png';
import index_3 from '/assets/imgs/Index_3.png';

function Index() {
  const { user } = useAuth();
  const [showCountUp, setShowCountUp] = useState(false);

  const handleSlideChange = (swiper) => {
    // 현재 슬라이드 인덱스가 마지막 슬라이드인 경우 showCountUp 값을 true로 변경
    if (swiper.isEnd) {
      setShowCountUp(true);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen gap-3 mx-auto max-w-screen-pet-l bg-pet-bg">
      <Swiper
        className="w-full h-[75vh]  rounded-xl "
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide className="relative px-5 ">
          <p className="text-xl font-bold absolute top-[60px]">
            유기동물과 사랑으로
            <br /> 이어주는 서비스,{' '}
            <span className="text-pet-green">펫:브릿지</span>
          </p>
          <p className="absolute top-[130px]">
            유기동물들에게
            <br /> 손을 내밀고 싶은 사람들에게
            <br /> 기회를 제공해주는 서비스
          </p>

          <img
            src={index_1}
            className="absolute top-[350px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xs"
          />
        </SwiperSlide>
        <SwiperSlide className="relative px-5 ">
          <p className="text-xl font-bold absolute top-[60px]">
            유기동물 후원물품 판매
          </p>
          <p className="absolute top-[130px]">
            유기동물들의 삶에 밝은
            <br /> 변화를 가져다 주는{' '}
            <span
              style={{
                background:
                  'linear-gradient(to top, #FFD966 50%, transparent 50%)',
              }}
            >
              구매
            </span>
            <br /> 경험을 만나보세요.
          </p>
          <img
            src={index_2}
            className="absolute top-[350px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xs"
          />
        </SwiperSlide>
        <SwiperSlide className="relative px-5 ">
          <p className="text-xl font-bold absolute top-[60px]">
            유기동물 보호소 정보
          </p>
          <p className="absolute top-[130px]">
            <span
              style={{
                background:
                  'linear-gradient(to top, #FFD966 50%, transparent 50%)',
              }}
            >
              {' '}
              유기동물 봉사
            </span>
            ,
            <br />
            어떻게 시작해야 할지 고민이라면 <br />
            내 주변 보호소를 찾아 시작해보세요. <br />
            당신의 소중한 시간과 관심이 <br />
            동물들에게 큰 도움이 됩니다.
          </p>
          <img
            src={index_3}
            className="absolute top-[350px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xs"
          />
        </SwiperSlide>
        <SwiperSlide className="relative px-5 ">
          <p className="text-xl font-bold absolute top-[60px]">
            펫:브릿지를 통해
          </p>
          <p className="absolute top-[120px] ">
            {showCountUp && (
              <span
                style={{
                  background:
                    'linear-gradient(to top, #FFD966 30%, transparent 30%)',
                }}
                className="text-[50px] font-extrabold"
              >
                <CountUp start={0} end={24105} duration={2} separator="," />
              </span>
            )}
            <br />
            마리의 유기동물이 <br />
            사랑을 받고 있고,
          </p>
          <p className="absolute top-[240px] ">
            {showCountUp && (
              <span
                style={{
                  background:
                    'linear-gradient(to top, #FFD966 30%, transparent 30%)',
                }}
                className="text-[50px] font-extrabold"
              >
                <CountUp start={0} end={6382} duration={2} separator="," />
              </span>
            )}
            <br />
            명의 사용자의 다리를 <br />
            만들어 주었습니다.
          </p>
        </SwiperSlide>
      </Swiper>

      {!user ? (
        <p className="flex gap-6">
          <Link to={`/signin`} className="text-xl font-bold text-pet-orange">
            로그인
          </Link>
          <Link to={`/signup`} className="text-xl font-bold text-pet-orange">
            회원가입
          </Link>
        </p>
      ) : (
        <p></p>
      )}
      <Link className="text-xl font-bold text-gray-1" to={`/home`}>
        건너뛰기
      </Link>
    </div>
  );
}

export default Index;
