import { Link } from 'react-router-dom';

function ButtonSection() {
  return (
    <div className="mt-4 w-full text-center">
      <button
        type="submit"
        className="bg-primary cursor-pointer px-10 py-2 rounded-md w-full"
      >
        로그인
      </button>
      <Link
        to="/signup"
        className="block bg-pet-green text-white px-10 py-2 rounded-md w-full mt-4"
      >
        회원가입
      </Link>
    </div>
  );
}
export default ButtonSection;
