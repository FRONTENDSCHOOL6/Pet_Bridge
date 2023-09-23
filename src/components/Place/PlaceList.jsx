import getPbImageURL from '@/utils/getPbImageUrl';
import { PropTypes } from 'prop-types';

function PlaceList({ place }) {
  return (
    <li key={place.id}>
      <a
        href={place.url}
        target="_blank"
        rel="noreferrer noopener"
        className="w-full bg-white flex overflow-hidden items-center mb-[5%] rounded-[10px]  shadow-lg"
      >
        <img
          className="w-[35%] h-auto"
          src={getPbImageURL(place, 'photo')}
          alt=""
        />
        <dl className="pl-[2.5%] text-left">
          <dt className="text-sm font-bold mb-[3%] pet-m:text-lg pet-l:text-2xl transition-[0.3s]">
            {place.title}
          </dt>
          <dd className="text-xs pet-m:text-base pet-l:text-lg transition-[0.3s]">
            주소: {place.address}
          </dd>
          <dd className="text-xs pet-m:text-base pet-l:text-lg transition-[0.3s]">
            Tel : {place.tel}
          </dd>
        </dl>
      </a>
    </li>
  );
}

export default PlaceList;

PlaceList.propTypes = {
  place: PropTypes.object.isRequired,
};
