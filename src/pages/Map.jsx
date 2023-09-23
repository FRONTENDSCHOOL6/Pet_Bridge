import Footprint from '/assets/imgs/footprint_place.png';
import placeMarker from '/assets/imgs/place_marker_place.png';
import { useEffect } from 'react';

function Map() {
  let map;
  let locPosition;

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f96d44b4551fd9c5ecb3902dd62f3199&libraries=services&autoload=false`;
    script.onload = () => kakao.maps.load(initMap);
    document.head.appendChild(script);
  };

  const initMap = () => {
    // 기본 마커 이미지 설정
    var imageSrc = placeMarker,
      imageSize = new kakao.maps.Size(72, 69),
      imageOption = { offset: new kakao.maps.Point(35, 69) };

    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 사용자 위치용 커스텀 마커 이미지 설정
    var userLocImageSrc = Footprint,
      userLocImageSize = new kakao.maps.Size(72, 69),
      userLocImageOption = { offset: new kakao.maps.Point(35, 69) };

    var userLocMarkerImage = new kakao.maps.MarkerImage(
      userLocImageSrc,
      userLocImageSize,
      userLocImageOption
    );

    let container = document.getElementById('map');

    map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(37.54699, 127.09598),
      level: 4,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude,
          lon = position.coords.longitude;
        locPosition = new kakao.maps.LatLng(lat, lon);
        var message =
          '<div style="padding:5px 25px 5px 5px; width: max-content;">내 주변 보호소를 찾아보세요!</div>';
        displayMarker(locPosition, message);

        //장소검색 객체 생성
        var ps = new kakao.maps.services.Places(map);

        //키워드로 장소 검색
        ps.keywordSearch('동물 보호', placesSearchCB);
      });

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          for (var i = 0; i < data.length; i++) {
            displayPlaceMarker(data[i]);
          }

          // 다시 사용자의 현재 위치로 중심 이동 및 확대 레벨 조정
          map.setCenter(locPosition);
          map.setLevel(2); // 원하는 확대 레벨로 설정
        }
      }
    } else {
      locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      var message = '현재 위치를 사용할 수 없어요..';
      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition, message) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: userLocMarkerImage, // 사용자 위치 마커 이미지 설정
      });

      var iwContent = message,
        iwRemoveable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);

      map.setCenter(locPosition);
    }

    function displayPlaceMarker(place) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage, // 기본 마커 이미지 설정
      });

      var infowindow = new kakao.maps.InfoWindow({
        content:
          '<div1 style="padding:5px;font-size:12px;">' +
          place.place_name +
          '</div1>',
        removable: true,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });
    }
  };

  return (
    <div
      className="max-w-screen-pet-l mx-auto"
      id="map"
      style={{ height: '100vh', width: '100%' }}
    ></div>
  );
}

export default Map;
