import top_icon from '/assets/icons/top_icon.svg';
import { useLocation } from 'react-router-dom';

function GoTopButton() {
  const location = useLocation();

  switch (location.pathname) {
    case '/':
    case '/signin':
    case '/signup':
    case '/cart':
    case '/map':
      return null;

    default:
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed pet-s:right-5  pet-l:right-[calc(50%-(428px))] z-50 rounded-full w-14 h-14 border-gray-1 bottom-32 bg-pet-bg"
      style={{
        // transition: '.2s ease-in-out', 움직일때 애니메이션
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // 그림자 스타일 조정
      }}
    >
      <img src={top_icon} className="mx-auto" alt="최상단 가기" />
    </button>
  );
}

export default GoTopButton;
