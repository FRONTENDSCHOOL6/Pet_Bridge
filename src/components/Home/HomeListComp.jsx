import pb from '@/api/pocketbase';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeItemComp from './HomeItemComp';

function HomeListCompo(props) {
  const [homeList, setHomeList] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const getHomeList = async () => {
      try {
        const homeListData = await pb.collection('place').getFullList();
        setHomeList(homeListData);
      } catch (error) {
        throw new Error('Error fetching place list');
      }
    };
    getHomeList();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 840) {
        setSlidesPerView(7.6);
      } else if (window.innerWidth >= 720) {
        setSlidesPerView(6.6);
      } else if (window.innerWidth >= 600) {
        setSlidesPerView(5.6);
      } else if (window.innerWidth >= 480) {
        setSlidesPerView(4.6);
      } else if (window.innerWidth >= 360) {
        setSlidesPerView(3.6);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize); // cleanup function
  }, []);

  return (
    <section className="flex flex-col gap-3 px-5 py-3">
      <div className="flex items-center justify-between">
        <h2 className="inline font-bold pet-m:text-lg  pet-l:text-xl transition-[0.3s]">
          {props.title}
        </h2>
        <Link
          to={`/place`}
          className="text-xs"
          onClick={() => window.scrollTo(0, 0)}
          aria-label={`보호센터 더보기`}
        >
          더보기 &gt;
        </Link>
      </div>

      <Swiper
        className="w-full"
        spaceBetween={20}
        slidesPerView={slidesPerView}
        centeredSlides={false}
        loop={false}
      >
        {homeList?.map((place) => (
          <SwiperSlide key={place.id} className="">
            <HomeItemComp item={place} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

HomeListCompo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeListCompo;
