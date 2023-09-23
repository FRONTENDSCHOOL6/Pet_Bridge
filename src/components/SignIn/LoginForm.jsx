import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import InputSection from './InputSection';
import ButtonSection from './ButtonSection';
import { useState } from 'react';
import debounce from '@/utils/debounce';

function LoginForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate('/mypage');
    }
  }, [user, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = formState;

    try {
      await pb.collection('users').authWithPassword(email, password);
      navigate('/mypage');
    } catch (error) {
      console.error(error);
      toast('이메일, 비밀번호를 확인해주세요.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    }
  };

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);
  return (
    <form
      onSubmit={handleSignIn}
      className="flex flex-col gap-2 mt-4 justify-start items-start border-t-2 border-gray-800 pt-6"
    >
      <InputSection formState={formState} handleInput={handleInput} />
      <ButtonSection />
    </form>
  );
}
export default LoginForm;
