import { Helmet } from 'react-helmet-async';
import KakaoLoginSection from './../components/SignIn/KakaoLoginSection';
import LoginForm from './../components/SignIn/LoginForm';

function SignIn() {
  return (
    <>
    <Helmet>
        <title>펫:브릿지 - 로그인</title>
      </Helmet>
    <div className="max-w-screen-pet-l mx-auto flex flex-col items-center pt-10 bg-pet-bg">
      <h2 className="text-3xl text-center pet-black font-semibold">로그인</h2>
      <LoginForm />
      <KakaoLoginSection />
    </div>
    </>
    
  );
}

export default SignIn;
