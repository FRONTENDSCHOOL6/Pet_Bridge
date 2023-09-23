import getPbImageURL from '@/utils/getPbImageUrl';
import PropTypes from 'prop-types';

function HomeItemCompo({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      <div className="flex gap-1 flex-col w-[90px]">
        <img
          alt={item.title}
          src={getPbImageURL(item, 'photo')}
          className="rounded-lg w-[90px] h-[90px] object-cover aria-hidden"
        />
        <p className="overflow-hidden text-xs font-bold whitespace-nowrap text-ellipsis">
          {item.title}
        </p>
        <p className="overflow-hidden text-xs whitespace-nowrap text-ellipsis">
          {item.address}
        </p>
      </div>
    </a>
  );
}
HomeItemCompo.propTypes = {
  item: PropTypes.object,
};

export default HomeItemCompo;
