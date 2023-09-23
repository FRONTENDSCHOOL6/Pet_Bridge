import PlaceModal from '@/components/Place/PlaceModal';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shelter from '/assets/imgs/shelter_place.png';
import { useState } from 'react';

function RecommendShelter() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <section className="my-0 mx-[20px]">
      <h2 className="font-bold mt-[10%] mb-[3%] mx-0 text-sm pet-m:text-lg pet-l:text-xl transition-[0.3s]">
        추천 보호소
      </h2>
      <div className="bg-white  shadow-lg rounded-[15px] p-[4%]">
        <img className="" src={shelter} alt="" />
        <dl>
          <dt className="text-base font-bold mt-[5%] mb-[2%] mx-0 pet-m:text-lg pet-l:text-2xl transition-[0.3s]">
            고양시 동물보호센터
          </dt>
          <dd className="text-xs pet-m:text-base pet-l:text-lg">
            주소: 경기도 고양시 덕양구 고양대로 1695
          </dd>
        </dl>
        <div className="flex justify-between text-sm mt-[5%]">
          <a
            href="tel:010-4634-4879"
            className="bg-primary rounded-[10px] w-[48%]  mr-[4%] flex justify-center items-center px-0 py-[3%]  shadow-lg text-sm pet-m:text-base pet-l:text-xl transition-[0.3s]"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className="mr-[3%] text-base pet-m:text-base pet-l:text-xl transition-[0.3s]"
            />
            전화하기
          </a>
          <button
            onClick={openModal}
            className="bg-pet-green rounded-[10px] text-white w-[48%] flex justify-center items-center px-0 py-[3%]  shadow-lg text-sm pet-m:text-base pet-l:text-xl transition-[0.3s]"
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="mr-[5%] text-base pet-m:text-lg pet-l:text-xl transition-[0.3s]"
            />
            위치보기
          </button>
          <div id="portal">
            <PlaceModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default RecommendShelter;
