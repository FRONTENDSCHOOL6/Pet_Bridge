import HomeContact from '@/components/Home/HomeContact';
import HomeCumulativeAmount from '@/components/Home/HomeCumulativeAmount';
import HomeListComp from '@/components/Home/HomeListComp';
import HomeBenner from '@/components/Home/HomeBenner';
import GoAbout from '@/components/Home/GoAbout';

function Home() {
  return (
    <div className="mx-auto max-w-screen-pet-l bg-pet-bg">
      <HomeCumulativeAmount Amount={2132154} />
      <HomeBenner title={'유기동물에게 희망을 전달하세요!'} />
      <HomeContact title={'도움이 필요한 유기동물이 있나요?'} />
      <HomeListComp title={'봉사활동 여기는 어떠세요?'} />
      <GoAbout title={'우린 이런 단체입니다!'} />
    </div>
  );
}

export default Home;
