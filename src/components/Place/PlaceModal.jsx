import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import placeMarker from '/assets/imgs/place_marker_place.png';

const MapComponent = ({ location }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f96d44b4551fd9c5ecb3902dd62f3199&autoload=false`;

    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.64952401004023, 126.87008894272654),
          level: 4,
        };

        const map = new kakao.maps.Map(container, options);

        // 마커 표시
        const markerPosition = new kakao.maps.LatLng(
          37.64952401004023,
          126.87008894272654
        );

        // 마커 이미지 생성
        const markerImageSrc = placeMarker; // 커스텀 마커 이미지 URL

        const markerImageSize = new kakao.maps.Size(50, 50); // 커스텀 마커 이미지 크기

        const markerImageOptions = {
          offset: new kakao.maps.Point(25, 50), // 커스텀 마커 이미지의 기준 좌표 (마커포인트와 관련된 옵션)
        };

        const markerImage = new kakao.maps.MarkerImage(
          markerImageSrc,
          markerImageSize,
          markerImageOptions
        );

        // 마커 생성 및 설정
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        // 지도에 마커 추가
        marker.setMap(map);

        // 인포윈도우 표출 내용과 설정
        const iwContent =
          '<div style="padding:5px 5px 5px 17px;">고양시 동물보호센터</div>';

        // 인포윈도우 생성 및 설정
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        // 인포윈도우를 마커 위에 표시
        infowindow.open(map, marker);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location]);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

const PlaceModal = ({ isOpen, onClose, location }) => {
  if (!isOpen) return null;

  useEffect(() => {
    // 모달 열림
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClose = (e) => {
    // 원래 overflow 상태로 복원
    document.body.style.overflow = 'auto';

    // onClose 함수 호출
    onClose(e);
  };
  const onContentClick = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      className="max-w-screen-pet-l mx-auto fixed inset-0 bg-[rgba(0,0,0,.7)] z-[999]"
      onClick={handleClose}
    >
      <div
        className="max-w-[800px] fixed -translate-x-2/4 -translate-y-2/4 z-[1000] w-[85%] h-3/5 p-5 left-2/4 top-2/4 bg-white"
        onClick={onContentClick}
      >
        <button
          className="absolute top-[-10%] w-[99px] h-[35px] font-bold rounded-[20px] right-0 bg-primary"
          onClick={handleClose}
        >
          닫기
        </button>
        {isOpen && <MapComponent location={location} />}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default PlaceModal;

MapComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

PlaceModal.propTypes = {
  isOpen: PropTypes.object.isRequired,
  onClose: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
