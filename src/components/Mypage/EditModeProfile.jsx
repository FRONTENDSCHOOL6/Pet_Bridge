import Button from '../Common/Button';
import Input from '../Common/Input';
import DefaultUser from '/assets/imgs/profileImg_default.png';
import { PropTypes } from 'prop-types';

export default function EditModeProfile({
  avatarUrl,
  updatedUser,
  handleAvatarChange,
  handleProfileChange,
  handleSaveProfile,
  setIsEditMode,
}) {
  return (
    <>
      <div className="text-center">
        <h2 className="sr-only">프로필 편집 모드</h2>
        <label htmlFor="avatar" className="cursor-pointer">
          <img
            src={avatarUrl ? avatarUrl : updatedUser.avatar}
            alt="사용자 프로필"
            className="w-24 h-24 rounded-full inline-block"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DefaultUser;
            }}
          />
          <p className="mt-4 py-[0.3rem] w-[150px] mx-auto font-medium text-pet-black bg-primary rounded hover:bg-[#FFC71C] transition-[0.3s]">
            프로필 사진 변경
          </p>
        </label>
        <input
          type="file"
          id="avatar"
          accept=".jpg,.png,.svg,.webp"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
        <div className="mt-8 flex flex-col items-center gap-2 w-full mx-auto">
          <div className="flex items-center gap-2 mb-1 w-[250px]">
            <p className="font-bold text-lg">username</p>
            <Input
              name="username"
              value={updatedUser.username}
              onChange={handleProfileChange}
            />
          </div>
          <div className="flex items-center justify-end gap-2 mb-[1rem] w-[250px]">
            <p className="font-bold text-lg">email</p>
            <Input name="email" value={updatedUser.email} readOnly />
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 justify-end">
        <Button
          onClick={handleSaveProfile}
          text="저장"
          bgColor="bg-pet-green"
          hoverColor="bg-[#47A36E]"
        />
        <Button
          onClick={() => setIsEditMode(false)}
          text="취소"
          border="border border-pet-green"
          textColor="text-pet-black"
          bgColor="bg-none"
          hoverColor="bg-pet-red hover:text-white"
        />
      </div>
    </>
  );
}

EditModeProfile.propTypes = {
  avatarUrl: PropTypes.object.isRequired,
  updatedUser: PropTypes.number.isRequired,
  handleAvatarChange: PropTypes.number.isRequired,
  handleProfileChange: PropTypes.number.isRequired,
  handleSaveProfile: PropTypes.number.isRequired,
  setIsEditMode: PropTypes.number.isRequired,
};
