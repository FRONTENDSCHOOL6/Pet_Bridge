import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';

function SignUpForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/mypage');
    }
  }, [user, navigate]);

  const koreaName = /^.{1,9}[가-힣]$/; // 한글 2~10글자
  const nickName = /^.{2,14}[a-z | A-Z]$/; // 영문 3~15글자
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 일반적인 이메일 형식
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/; // 6~16글자 영문+숫자

  const [formState, setFormState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  // 유효성 검사 상태
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  // 유효성 검사 전체 통과 확인
  const isFormValid = () => {
    return Object.values(validationErrors).every((error) => error === false);
  };

  // 비밀번호 숨김/표시 상태 관리
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  // 회원가입 등록 핸들러
  const handleRegister = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = formState;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    await pb.collection('users').create({
      ...formState,
      emailVisibility: true,
    });

    toast('환영합니다! 가입이 완료되었습니다!', {
      position: 'top-right',
      icon: '🎉',
      ariaProps: {
        role: 'alert',
        'aria-live': 'polite',
      },
    });
    navigate('/signin');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    let isValid;

    switch (name) {
      case 'name':
        isValid = koreaName.test(value);
        break;
      case 'username':
        isValid = nickName.test(value);
        break;
      case 'email':
        isValid = emailRegex.test(value);
        break;
      case 'password':
        isValid = passwordRegex.test(value);
        break;
      case 'passwordConfirm':
        isValid = formState.password === value;
        break;
      default:
        return;
    }

    setValidationErrors({
      ...validationErrors,
      [name]: !isValid,
    });

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDebounceInput = debounce(handleInput, 500);
  // 비밀번호 숨김/표시 토글 함수
  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  const toggleConfirmPasswordHidden = () => {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
  };
  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-2 mt-4 justify-start items-start border-t-2 border-gray-800 pt-6"
    >
      <InputField
        name="name"
        label="이름"
        defaultValue={formState.name}
        placeholder="이름을 입력해 주세요"
        type="text"
        onChange={handleDebounceInput}
        isValid={!validationErrors.name && formState.name !== ''}
        passMessage=" 가입가능한 이름입니다."
        failMessage="2자 이상 10자 이하의 한글"
      />
      <InputField
        name="username"
        label="닉네임 (영문)"
        defaultValue={formState.username}
        placeholder="닉네임을 입력해 주세요"
        type="text"
        onChange={handleDebounceInput}
        isValid={!validationErrors.username && formState.username !== ''}
        passMessage=" 사용가능한 계정 이름입니다."
        failMessage="최소 3자 이상 15자 이하의 영문"
      />
      <InputField
        name="email"
        label="이메일"
        defaultValue={formState.email}
        placeholder="예: petbridge@gmail.com"
        type="email"
        onChange={handleDebounceInput}
        isValid={!validationErrors.email && formState.email !== ''}
        passMessage=" 사용가능한 이메일입니다."
        failMessage="올바른 이메일 형식이 아닙니다."
      />
      <InputField
        name="password"
        label="비밀번호"
        defaultValue={formState.password}
        placeholder="비밀번호를 입력해 주세요"
        type={isPasswordHidden ? 'password' : 'text'}
        onChange={handleDebounceInput}
        isValid={!validationErrors.password && formState.password !== ''}
        passMessage="사용가능한 계정 비밀번호입니다."
        failMessage="비밀번호는 영문, 숫자를 포함하여 6자~16자로 입력해주세요."
        isPasswordHidden={isPasswordHidden}
        togglePasswordHidden={togglePasswordHidden}
      />
      <InputField
        name="passwordConfirm"
        label="비밀번호 확인"
        defaultValue={formState.passwordConfirm}
        placeholder="비밀번호를 한번 더 입력해 주세요"
        type={isConfirmPasswordHidden ? 'password' : 'text'}
        onChange={handleDebounceInput}
        isValid={
          !validationErrors.passwordConfirm && formState.passwordConfirm !== ''
        }
        passMessage="비밀번호와 일치합니다."
        failMessage="비밀번호와 일치하지 않습니다. 다시 확인해주세요."
        isPasswordHidden={isConfirmPasswordHidden}
        togglePasswordHidden={toggleConfirmPasswordHidden}
      />
      <div className="mt-4 w-full text-center">
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`px-10 py-2 rounded-md w-full ${
            isFormValid()
              ? 'bg-primary cursor-pointer'
              : 'bg-gray-1 cursor-not-allowed'
          }`}
        >
          가입하기
        </button>
        <Link
          to="/home"
          className="block bg-pet-green text-white px-10 py-2 rounded-md w-full mt-4"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
export default SignUpForm;
