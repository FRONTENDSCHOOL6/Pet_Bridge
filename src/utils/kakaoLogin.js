import pb from '@/api/pocketbase';

const kakaoLogin = async () => {
  try {
    const user = await pb.collection('users').authWithOAuth2({
      provider: 'kakao',
    });

    // ※ 권한(Authorization) 부여를 위한 역할(role)이 설정된 경우
    // const role = await pb.collection('roles').getFirstListItem('name="일반"');

    // Kakao 공급자로부터 전달받은 메타데이터에서 필요한 데이터 추출
    const { username: name, email } = user.meta;

    // 업데이트 할 사용자 정보 취합
    const updateUser = {
      name,
      username: email.split('@')[0],
      // ※ 권한(Authorization) 부여를 위한 역할(role)이 설정된 경우
      // role: role.id,
    };

    // 사용자 정보 업데이트 요청
    return await pb.collection('users').update(user.record.id, updateUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default kakaoLogin;
