import { useEffect, useState } from 'react';

function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth',
    });
  };
// 스크롤 포인트 지정
const checkScrollPosition = () => {
  const productDescription =
    document.getElementById('productDescription').offsetTop;
  const productDetails = document.getElementById('productDetails').offsetTop;
  const reviews = document.getElementById('reviews').offsetTop;

  // 현재 뷰포트의 하단 위치 계산
  const scrollPosition = window.scrollY;
  const viewportBottom = window.scrollY + window.innerHeight;

  // 스크롤 포인트에 따라 상태 변경
  if (
    scrollPosition >= reviews ||
    viewportBottom === document.body.scrollHeight
  ) {
    setActiveSection('reviews');
  } else if (scrollPosition >= productDetails) {
    setActiveSection('productDetails');
  } else if (scrollPosition >= productDescription) {
    setActiveSection('productDescription');
  }
};
// useEffect 사용
useEffect(() => {
  window.addEventListener('scroll', checkScrollPosition);
  return () => window.removeEventListener('scroll', checkScrollPosition);
}, []);
  
  return (
    <ul className="max-w-4xl h-14 bg-pet-bg font-bold flex justify-evenly border-gray-1 border top-[60px] sticky">
      <li onClick={() => scrollToElement('productDescription')}
        className={`py-3 border-r border-gray-1 text-center w-[33.3%] cursor-pointer  ${activeSection === 'productDescription' ? 'bg-primary' : '' }`}>
          <h3>상품사진</h3>
        </li>
        <li onClick={() => scrollToElement('productDetails')} 
        className={`py-3 border-r border-gray-1 text-center w-[33.3%] cursor-pointer ${activeSection === 'productDetails' ? 'bg-primary' : '' }`}>
          <h3>상세정보</h3>
        </li>
        <li onClick={() => scrollToElement('reviews')} 
        className={`py-3 text-center w-[33.3%] cursor-pointer ${activeSection === 'reviews' ? 'bg-primary' : '' }`}>
          <h3>리뷰</h3>
        </li>
    </ul>
  );
}

export default Navigation