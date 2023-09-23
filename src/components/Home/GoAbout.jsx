import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import cat_hand from '/assets/icons/cat_hand_icon.svg';
import ppl_hand from '/assets/icons/ppl_hand_icon.svg';

function GoAbout(props) {
  return (
    <section className="flex flex-col gap-3 px-5 py-3">
      <div className="flex items-center justify-between">
        <h2 className="inline font-bold pet-m:text-lg pet-l:text-xl">
          {props.title}
        </h2>
        <Link
          to={`/about`}
          className="text-xs"
          onClick={() => window.scrollTo(0, 0)}
          aria-label={`어바웃 더보기`}
        >
          더보기 &gt;
        </Link>
      </div>
      <Link
        to={`/about`}
        onClick={() => window.scrollTo(0, 0)}
        className="relative flex flex-row items-center justify-between gap-3 py-3 rounded-lg bg-pet-green"
        tabIndex={-1}
      >
        <img src={ppl_hand} alt="" className="w-[20%] max-w-[80px]" />
        <span className="text-2xl font-bold text-center text-pet-bg">
          About Us <br />
          펫:브릿지
        </span>
        <img src={cat_hand} alt="" className="w-[20%] max-w-[80px]" />
      </Link>
    </section>
  );
}

GoAbout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GoAbout;
