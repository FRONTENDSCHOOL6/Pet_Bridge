import kakaoLogin from '@/utils/kakaoLogin';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function KakaoLoginSection() {
  return (
    <div className="flex flex-col mt-4 text-center w-[300px] border-t border-gray-800 pt-4">
      <button
        onClick={kakaoLogin}
        className="bg-[#F7E600] cursor-pointer px-10 py-2 rounded-md relative"
      >
        <FontAwesomeIcon
          icon={faComment}
          className="absolute left-[20px] bottom-[12px]"
        />
        카카오계정으로 로그인
      </button>
    </div>
  );
}
export default KakaoLoginSection;
