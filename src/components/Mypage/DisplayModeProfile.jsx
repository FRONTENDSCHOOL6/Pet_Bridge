import Button from '../Common/Button';
import DefaultUser from '/assets/imgs/profileImg_default.png';
import { PropTypes } from 'prop-types';

export default function DisplayModeProfile({
  avatarUrl,
  updatedUser,
  isLoading,
  setIsEditMode,
  handleSignOut,
  handleCancelMembership,
}) {
  return (
    <div className="text-center">
      {isLoading ? (
        <p>프로필 사진 불러오는 중...</p>
      ) : (
        <img
          src={avatarUrl || DefaultUser}
          alt="사용자 프로필"
          className="w-24 h-24 rounded-full inline-block"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DefaultUser;
          }}
        />
      )}
      <div className="mt-4">
        <h2 className="sr-only">나의 프로필</h2>
        <p className="text-xl font-bold mb-2">{updatedUser.username}</p>
        <span className="text-gray-500 mb-6 block">{updatedUser.email}</span>
      </div>
      <div className="mt-2 flex flex-col gap-2 w-full">
        <Button
          onClick={() => setIsEditMode(true)}
          text="프로필 변경"
          bgColor="bg-primary"
          textColor="text-pet-black"
          hoverColor="bg-[#FFC71C] transition-[0.3s]"
        />
        <Button
          onClick={handleSignOut}
          text="로그아웃"
          bgColor="bg-pet-green"
          hoverColor="bg-[#47A36E] transition-[0.3s]"
        />
        <Button
          onClick={handleCancelMembership}
          text="회원탈퇴"
          bgColor="bg-pet-red"
          hoverColor="bg-[#D4452B] transition-[0.3s]"
        />
      </div>
    </div>
  );
}

DisplayModeProfile.propTypes = {
  avatarUrl: PropTypes.object.isRequired,
  updatedUser: PropTypes.number.isRequired,
  isLoading: PropTypes.number.isRequired,
  setIsEditMode: PropTypes.number.isRequired,
  handleSignOut: PropTypes.number.isRequired,
  handleCancelMembership: PropTypes.number.isRequired,
};
