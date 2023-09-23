import { useState, useEffect } from 'react';
import nocash from '/assets/imgs/product_search_notfound.png';

function Modal() {
  const [showModal, setShowModal] = useState(false);

  // showModal 상태가 변경될 때마다 동작
  useEffect(() => {
    if (showModal) {
      // 모달이 열릴 때 body의 스크롤을 막음
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body의 스크롤을 원상복구
      document.body.style.overflow = 'unset';
    }

    return () => {
      // cleanup function: 컴포넌트 unmount 시에 body의 스크롤을 원상복구
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);
  return (
    <>
      <button className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0" onClick={() => setShowModal(true)}>
          결제하기
        </button>    
        {showModal && (
          <div className="fixed w-60 top-60 left-1/4 right-96 m-auto p-6 text-center bg-pet-bg z-[1000] rounded-2xl">
            <p className='text-center'>
              확장을 준비중입니다! <br />조금만 기다려주세요!!!
            </p>
            <img src={nocash} alt="모르겠어용" className="relative left-[17%]"/>
            <button className="w-full m-auto bg-primary rounded-lg text-lg" onClick={() => setShowModal(false)}>
              닫기
            </button>
          </div>
        )}

        {showModal && (
          <div className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-[999]" onClick={() => setShowModal(false)}/>
        )}
    </>
  )
}

export default Modal