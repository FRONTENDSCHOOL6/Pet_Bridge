import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import pb from '@/api/pocketbase';
import getPbImageURL from '@/utils/getPbImageUrl';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
// import './styles.css';
import { Autoplay, Pagination } from 'swiper/modules';

function HomeBenner(props) {
  const [homeBenner, setHomeBenner] = useState([]);
  const [productTitles, setProductTitles] = useState({});

  useEffect(() => {
    const getHomeBenner = async () => {
      try {
        const homeBennerData = await pb.collection('banner').getFullList();
        setHomeBenner(homeBennerData);
      } catch (error) {
        throw new Error('Error fetching place list');
      }
    };

    const getProductTitle = async () => {
      try {
        const productItems = await pb.collection('product').getFullList();
        const titleMap = productItems.reduce((map, item) => {
          map[item.id] = item.title;
          return map;
        }, {});

        setProductTitles(titleMap);
      } catch (error) {
        throw new Error('Error fetching Product list');
      }
    };
    getHomeBenner();
    getProductTitle();
  }, []);

  return (
    <section className="flex flex-col gap-3 px-5 py-3">
      <div className="flex items-center justify-between">
        <h2 className="inline font-bold pet-m:text-lg pet-l:text-xl transition-[0.3s]">
          {props.title}
        </h2>
        <Link
          to={`/productlist`}
          className="text-xs"
          onClick={() => window.scrollTo(0, 0)}
          aria-label={`쇼핑몰 더보기`}
        >
          더보기 &gt;
        </Link>
      </div>

      <Swiper
        className="w-full mySwiper rounded-xl"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
      >
        {/* Map each place to a swiper slide */}
        {homeBenner?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link
              to={`/productlist/detail/${banner.field}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={getPbImageURL(banner, 'img')}
                alt={productTitles[banner.field]}
                style={{
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

HomeBenner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeBenner;
