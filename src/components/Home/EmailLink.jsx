import PropTypes from 'prop-types';

function EmailLink(props) {
  const handleEmailClick = () => {
    let email = '';
    let subject = '';
    let body = '';

    if (props.type === 'donation') {
      email = 'catdog141000@gmail.com';
      subject = '후원 신청합니다.';
      body = `
        안녕하세요 저희 기관/단체에 대한 후원을 신청해 주셔서 감사합니다. 아래는 후원을 진행하기 위해 필요한 정보입니다:

        1. 기관/단체 정보:
          - 기관/단체 이름:
          - 연락처:
          - 주소:

        2. 후원 내용:
          - 후원 목적/목표:
          - 후원 금액 또는 물품:

        3. 홍보 및 인지도 향상 방안 (선택사항):
          - 홍보 계획 및 방법:

        4. 기타 사항 (선택사항):
          - 추가 정보 또는 요구사항:
      `;
    } else if (props.type === 'support') {
      email = 'catdog141000@gmail.com';
      subject = '후원 하고싶습니다.';
      body = `
        저희 기관/단체에 대한 후원을 진심으로 감사드립니다. 여러분의 후원은 저희가 추구하는 목표를 달성하는 데 큰 도움이 될 것입니다.

        아래는 후원 내역과 관련된 정보입니다:

        1. 기관/단체 정보:
           - 기관/단체 이름:
           - 연락처:
           - 주소:

        2. 후원 목적/목표:

        3. 후원 금액 또는 물품:

        다시 한번, 저와 함께하여 주신 것에 깊은 감사를 드리며, 앞으로도 지지와 협력을 부탁드립니다.

        감사합니다.
      `;
    } else if (props.type === 'application') {
      email = 'catdog141000@gmail.com';
      subject = '면접 지원합니다.';
      body = `
      안녕하세요,

      저희 기관/회사에 대한 면접 지원을 진심으로 감사드립니다. 귀하의 관심과 열정을 저희와 공유해 주셔서 감사합니다.
  
      아래는 면접 지원과 관련된 정보입니다:
  
      1. 지원자 정보:
  
      2. 지원 부문 및 포지션:
  
      3. 경력 사항 (선택사항):
      
      4. 기타 자격증 또는 스킬 (선택사항):
  
      5. 추가 정보 (선택사항):
  
      귀하의 지원서를 검토한 후 상세한 일정과 장소에 대해 다시 안내드리겠습니다.
      감사합니다.

       `;
    }

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  return <button onClick={handleEmailClick}>{props.text}</button>;
}

EmailLink.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['donation', 'support', 'application']).isRequired,
};

export default EmailLink;
