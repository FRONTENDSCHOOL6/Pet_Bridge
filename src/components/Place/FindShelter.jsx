import { Link } from 'react-router-dom';
import PlaceBg from '/assets/imgs/catbg_place.png';
import PlaceHome from '/assets/imgs/pet_house_place.png';

function FindShelter() {
  return (
    <>
      <section className="h-[14rem] pet-s:h-[16rem] pet-m:h-[22rem] pet-l:h-[25rem] overflow-hidden transition-[0.3s]">
        <img
          className="w-full object-cover object-center"
          src={PlaceBg}
          alt=""
        />
      </section>
      <section className="relative top-[-4.5rem] mb-[-3.5rem] my-0 mx-[20px]">
        <h2 className="sr-only">내 주변 보호소 찾기</h2>
        <Link
          to={`/map`}
          className="bg-primary text-2xl pet-m:text-3xl pet-l:text-4xl  shadow-lg flex justify-between items-center pl-[6%] pr-[3%] pt-[4%] pb-[3%] rounded-[20px]"
        >
          <p className="font-extrabold md:leading-[2.8rem] w-[55%] transition-[0.3s]">
            <span className="text-xs  mb-[0.3rem] pet-m:text-lg pet-l:text-2xl pet-l:mb-[1.3rem] block font-bold leading-[normal] transition-[0.3s]">
              가까운 곳부터 천천히
            </span>
            내 주변
            <br /> 보호소 찾기
          </p>
          <img className="w-[34%]" src={PlaceHome} alt="" />
        </Link>
      </section>
    </>
  );
}
export default FindShelter;
