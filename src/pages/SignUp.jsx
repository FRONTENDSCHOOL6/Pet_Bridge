import SignUpForm from '../components/SignUp/SignUpForm';

function SignUp() {
  return (
    <div className="max-w-screen-pet-l mx-auto flex flex-col items-center pt-10 bg-pet-bg">
      <h2 className="text-3xl text-center pet-black font-semibold">회원가입</h2>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
