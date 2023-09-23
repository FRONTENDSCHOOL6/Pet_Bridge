import PropTypes from 'prop-types';
import EmailLink from './EmailLink';
import post_box from '/assets/imgs/post_box.png';

function HomeContact(props) {
  return (
    <section className="flex flex-col gap-3 px-5 py-3">
      <div className="flex items-center justify-between">
        <h2 className="inline font-bold pet-m:text-lg pet-l:text-xl transition-[0.3s]">
          {props.title}
        </h2>
        {/* <span className="text-xs">더보기 &gt;</span> */}
      </div>
      <div className="relative flex flex-col items-end gap-3 px-4 py-3 rounded-lg bg-primary">
        <p className="text-xl font-semibold text-right">
          주변의 유기동물의 사연을
          <br />
          펫:브릿지에게 보내주세요
        </p>
        <div className="px-2 py-1 text-xs font-bold border-2 border-black border-solid rounded-2xl">
          <EmailLink text={`후원신청하기 >`} type="support" />
        </div>
        <img alt="" src={post_box} className="absolute bottom-0 left-2"></img>
      </div>
    </section>
  );
}

HomeContact.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeContact;
