import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MyPageLikedProductsSection from '../components/Mypage/MyPageLikedProductsSection';
import MyPageProfileSection from '../components/Mypage/MyPageProfileSection';
import DefaultUser from '/assets/imgs/profileImg_default.png';

const kakaoLogout = async () => {
  const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;
  const LOGOUT_REDIRECT_URI = 'http://localhost:5173/';
  try {
    location.replace(
      `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}Pet_Bridge/home`
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

function MyPage() {
  const { user, signOut, cancelMembership, updateUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user && !isLoggingOut) {
      toast('로그인 후 이용해 주세요.', {
        position: 'top-right',
        icon: '🙇‍♀️',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      navigate('/signin');
    } else {
      const fetchLikedProducts = async () => {
        try {
          setIsLoading(true);
          const data = await pb
            .collection('users')
            .getOne(user.id, { expand: 'LikedProducts' });
          setUserData(data);

          const refreshedUser = await pb.collection('users').getOne(user.id);
          const url = pb.files.getUrl(refreshedUser, refreshedUser.avatar);

          setAvatarUrl(url);
          toast('오늘도 좋은 하루 되세요!', {
            position: 'top-right',
            icon: '🍀',
            ariaProps: {
              role: 'alert',
              'aria-live': 'polite',
            },
          });
        } catch (error) {
          console.error('Error: ', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchLikedProducts(user.id);
      setIsLoggingOut(false);
    }
  }, [user, navigate, isLoggingOut]);

  // 로그아웃 핸들러
  const handleSignOut = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setIsLoggingOut(true);

      if (user.verified === true) {
        await kakaoLogout();
        await signOut();
      } else {
        await signOut();
      }

      toast('정상적으로 로그아웃 되었습니다.', {
        position: 'top-right',
        icon: '🐾',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      setIsLoggingOut(false);
      navigate('/home');
    }
  };

  // 회원탈퇴 핸들러
  const handleCancelMembership = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 🥲')) {
      await cancelMembership(user.id);
      toast('회원탈퇴가 완료되었습니다.', {
        position: 'top-right',
        icon: '😿',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      navigate('/home');
    }
  };

  // 프로필 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 변경할 사용자 정보 상태
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username,
    email: user?.email,
    avatar: avatarUrl || DefaultUser,
    avatarFile: null,
  });

  useEffect(() => {
    setUpdatedUser({
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar,
    });
  }, [user]);

  // 프로필(이미지X) 변경 핸들러
  const handleProfileChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  // 프로필(이미지) 변경 핸들러
  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(newImageUrl); // avatarUrl 상태 업데이트

      setUpdatedUser({
        ...updatedUser,
        avatar: newImageUrl, // 새로운 이미지 URL 사용
        avatarFile: e.target.files[0],
      });
    }
  };
  // 프로필 변경정보 저장 핸들러
  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('username', updatedUser.username);
      formData.append('email', updatedUser.email);

      if (updatedUser.avatarFile) {
        formData.append('avatar', updatedUser.avatarFile);
      }

      // 사용자 정보 업데이트
      await updateUser(user.id, formData);

      // 업데이트된 사용자 정보 다시 불러오기
      const refreshedUser = await pb.collection('users').getOne(user.id);
      const avatarUrl = pb.files.getUrl(refreshedUser, refreshedUser.avatar);

      setUpdatedUser({
        ...refreshedUser,
        avatar: avatarUrl || DefaultUser,
        avatarFile: null,
      });

      toast('프로필이 변경되었습니다.', {
        position: 'top-right',
        icon: '🙆‍♀️',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="max-w-screen-pet-l mx-auto flex flex-col items-center pt-[100px] min-h-screen bg-pet-bg">
      <MyPageProfileSection
        isEditMode={isEditMode}
        updatedUser={updatedUser}
        avatarUrl={avatarUrl}
        isLoading={isLoading}
        handleProfileChange={handleProfileChange}
        handleAvatarChange={handleAvatarChange}
        handleSaveProfile={handleSaveProfile}
        setIsEditMode={setIsEditMode}
        handleSignOut={handleSignOut}
        handleCancelMembership={handleCancelMembership}
      />
      <MyPageLikedProductsSection
        userData={userData}
        isLoading={isLoading}
        handleSignOut={handleSignOut}
        handleCancelMembership={handleCancelMembership}
      />
    </article>
  );
}

export default MyPage;
