import EmailLink from '@/components/Home/EmailLink';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  faCartShopping,
  faEnvelope,
  faHandHoldingDollar,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import book from '/assets/icons/book_about_icon.svg';
import handHart from '/assets/icons/handHart_about_icon.svg';
import together from '/assets/icons/together_about_icon.svg';

import cat1 from '/assets/imgs/cat1_about.png';
import cat2 from '/assets/imgs/cat2_about.png';
import dog1 from '/assets/imgs/dog1_about.png';
import dog2 from '/assets/imgs/dog2_about.png';
import mainDog from '/assets/imgs/mainDog_about.png';

import CountUp from 'react-countup';

function About(props) {
  return (
    <div className="flex flex-col items-center px-5 mx-auto max-w-screen-pet-l gap-14 bg-pet-bg">
      {/* 메인 */}
      <section className="relative flex flex-col gap-2 pt-8 max-w-screen-pet-m">
        <h1 tabIndex={0} className="text-3xl font-extrabold">
          About
          <br />
          <span className="text-2xl">Pet:Bridge</span>
        </h1>

        <p className="text-xl font-bold">
          <span className="text-sm font-semibold">
            누적후원금액
            <br />
          </span>
          <span className="text-2xl font-black">
            <CountUp start={0} end={props.Amount} duration={2} separator="," />
          </span>
          원
        </p>
        <p>
          펫:브릿지는 순이익 전액을 &quot;유기동물과 사랑으로 이어주기&quot;
          위해 사용하고 있습니다.
        </p>
        <img
          src={mainDog}
          alt="메인강아지"
          className="absolute right-0 top-8"
        />
      </section>

      {/* 유기동물을 사랑으로 */}
      <section className="flex flex-col items-center gap-7 max-w-screen-pet-m">
        <h2
          tabIndex={0}
          className="font-bold pet-m:text-lg pet-l:text-xl transition-[0.3s]"
        >
          유기동물을 사랑으로
        </h2>
        <ul className="flex text-xs text-center gap-14">
          <li className="flex flex-col items-center gap-1">
            <img src={handHart} alt="입양장려" />
            <span>입양장려</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <img src={book} alt="인식개선" />
            <span>인식 개선</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <img src={together} alt="파트너십 구축" />
            <span>파트너십 구축</span>
          </li>
        </ul>
        <p className="text-xs text-center">
          펫:브릿지는 유기동물의 복지와 보호를 힘씁니다. <br />
          유기동물의 입양을 장려하고 유기동물 인식개선을 위해 노력합니다. <br />
          또한, 동물 보호소와의 파트너십을 구축하여 함께 협력합니다. <br />
          <br />
          유기동물들에게 새로운 가정과 사랑으로 가득한 삶을 제공하기 위해
          노력합니다.
        </p>
      </section>
      {/* 후원 동참하기 */}
      <section className="flex flex-col items-center gap-7 max-w-screen-pet-m">
        <h2
          tabIndex={0}
          className="font-bold pet-m:text-lg pet-l:text-xl transition-[0.3s]"
        >
          후원 동참하기
        </h2>
        <ul className="flex flex-row flex-wrap justify-center gap-6 text-xs text-center">
          <li className="flex flex-col items-center gap-2 w-[46%]">
            <FontAwesomeIcon icon={faCartShopping} className="w-10 h-10" />

            <h3 className="font-bold">
              <Link to={`/productlist`} onClick={() => window.scrollTo(0, 0)}>
                상품 구매하기 &gt;
              </Link>
            </h3>

            <p>
              구매로 유기동물을 후원해 보세요 <br /> 모든 수익금은 후원금에
              모금됩니다.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 w-[46%]">
            <FontAwesomeIcon icon={faHandHoldingDollar} className="w-10 h-10" />

            <h3 className="font-bold">
              <EmailLink text={'직접 후원하기 >'} type={'donation'} />
            </h3>

            <p>
              당신의 관심과 따뜻한 마음이 <br />
              유기동물들에게 큰 힘이 됩니다.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 w-[46%]">
            <FontAwesomeIcon icon={faEnvelope} className="w-10 h-10" />

            <h3 className="font-bold">
              <EmailLink text={'후원 신청하기 >'} type={'support'} />
            </h3>

            <p>
              도움이 필요하다면 망설이지말고 <br />
              연락주세요. 언제든 달려갑니다.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 w-[46%]">
            <FontAwesomeIcon icon={faUserGroup} className="w-10 h-10" />

            <h3 className="font-bold">
              <EmailLink text={'함께 활동하기 >'} type={'application'} />
            </h3>

            <p>
              유기동물과 사회와의 다리 <br />
              저희화 함께 만들어나가시겠어요?
            </p>
          </li>
        </ul>
      </section>

      <section className="flex flex-col items-center gap-7 max-w-screen-pet-m">
        <h2
          tabIndex={0}
          className="font-bold pet-m:text-lg pet-l:text-xl transition-[0.3s]"
        >
          어떻게 전액 후원이 가능한가요?
        </h2>
        <p className="text-xs">
          우리는 유기동물 친구들에게 큰 관심을 가지고 있었고, 소비자로서
          수익금의 일부를 후원하는 곳은 많았지만, 그 금액이 정확히 얼마인지도,
          실제로 어떤 도움이 필요한 곳에 사용되는지 항상 의문이었습니다. 그래서
          우리는 순수한 이익 전액을 후원하는 상점을 만들기로 결심했습니다.{' '}
          <br />
          <br />
          전액 후원은 어려운 일처럼 보였지만, 우리가 욕심을 버린다면 가능할
          것이라고 생각했습니다. 펫:브릿지는 매달 새로운 제품의 이익금 전액을
          후원하며, 종료된 상품들의 수익금으로 사이트를 운영합니다.
          <br />
          <br />
          우리의 목표는 유기동물들에게 진정한 도움이 되고자 하는 것입니다.
          펫:브릿지를 통해 당신도 함께 참여하여 유기동물들에게 새로운 기회와
          사랑을 나눠주실 수 있습니다.
        </p>
      </section>
      {/* 멤버소개 */}
      <section className="flex flex-col items-center gap-7 max-w-screen-pet-m">
        <div className="content-center ">
          <h2
            tabIndex={0}
            className="font-bold pet-m:text-lg pet-l:text-xl transition-[0.3s]"
          >
            CREAT TEAM
          </h2>
          <span className="block text-center">- ilsacheolli -</span>
        </div>

        <ul className="flex flex-row w-full gap-2">
          <li className="flex flex-col items-center">
            <img src={dog1} alt="강아지" />
            <span className="text-sm font-semibold">김승연</span>
            <span className="text-xs text-center ">
              ssssseungk
              <br />
              @gmail.com
            </span>
          </li>
          <li className="flex flex-col items-center">
            <img src={cat1} alt="고양이" />
            <span className="text-sm font-semibold">신동혁</span>
            <span className="text-xs text-center ">
              hg971027
              <br />
              @gmail.com
            </span>
          </li>
          <li className="flex flex-col items-center">
            <img src={dog2} alt="강아지" />
            <span className="text-sm font-semibold">이규정</span>
            <span className="text-xs text-center ">
              dlrbwjd7096
              <br />
              @gmail.com
            </span>
          </li>
          <li className="flex flex-col items-center">
            <img src={cat2} alt="고양이" />
            <span className="text-sm font-semibold">조희정</span>
            <span className="text-xs text-center ">
              gmlwjd7731
              <br />
              @gmail.com
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

About.propTypes = {
  Amount: PropTypes.number.isRequired,
};

export default About;
