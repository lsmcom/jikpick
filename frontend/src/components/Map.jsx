import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import check from '../assets/icon/Check.svg';
import axios from '../api/axios'; 

const MapWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const OptionWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`;

const MapOption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 72%;
    margin-bottom: 5px;
`;

const Toggle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: ${({ selected }) => (selected ? 'transparent' : '#d9d9d9')};
    margin-right: 10px;
    cursor: pointer;
    border: none;
    position: relative;
`;

const CheckIcon = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 700px;
`;

export default function Map({ selectedAddress, roadAddressList }) {
    const container = useRef(null);
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]); // 모든 마커 저장
    const [searchToggle, setSearchToggle] = useState(false); // 지도 이동시 재검색 토글
    const addressList = roadAddressList;

    

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
              const memberId = JSON.parse(localStorage.getItem('user')).id;
              const response = await fetch(`/api/location/get?memberId=${memberId}`);
              const data = await response.json();
      
              if (data) {
                const userLat = data.latitude;
                const userLng = data.longitude;
      
                window.kakao.maps.load(() => {
                  const map = new window.kakao.maps.Map(container.current, {
                    center: new window.kakao.maps.LatLng(userLat, userLng),
                    level: 5,
                  });
                  mapRef.current = map;
                  // 나머지 기존 로직 (마커 표시 등)
                });
              } else {
                console.log('사용자 위치 없음. 기본 서울 좌표 사용');
                createDefaultMap();
              }
            } catch (error) {
              console.error('사용자 위치 가져오기 실패:', error);
              createDefaultMap();
            }
        }
        
        const createDefaultMap = () => {
            window.kakao.maps.load(() => {
            const map = new window.kakao.maps.Map(container.current, {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 5,
            });
            mapRef.current = map;

            const geocoder = new window.kakao.maps.services.Geocoder();
            const tempMarkers = [];

            addressList.forEach((address) => {
                geocoder.addressSearch(address, (result, status) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
      
                    const marker = new window.kakao.maps.Marker({
                      position: coords,
                    });
      
                    marker.setMap(map);
                    tempMarkers.push(marker);
      
                    // 모든 요청이 끝났을 때 markers에 반영
                    if (tempMarkers.length === addressList.length) {
                      setMarkers(tempMarkers);
                    }
                } else {
                    console.error('주소 변환 실패:', address);
                }
            });
        });
        });
        }

        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (!selectedAddress || !mapRef.current) return;

        const map = mapRef.current;
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(selectedAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                map.setCenter(coords);

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    position: coords,
                });
                marker.setMap(map);
            }
        });
    }, [selectedAddress]);

    const handleSearchToggle = () => {
        setSearchToggle((prev) => !prev);
    };

    // 지도 이동/확대/축소 이벤트 처리
    useEffect(() => {
        // 지도가 없거나 등록된 마커가 없으면 무시
        if (!mapRef.current || markers.length === 0) return;

        const map = mapRef.current;

        const updateVisibleMarkers = () => {
            if (!searchToggle) return; // 토글이 꺼져있으면 무시
            const bounds = map.getBounds();

            markers.forEach((marker) => {
                const position = marker.getPosition();
                if (bounds.contain(position)) {
                    marker.setMap(map); // 지도 범위 안 → 표시
                } else {
                    marker.setMap(null); // 지도 범위 밖 → 숨김
                }
            });
        };

        // 지도 이동/확대/축소에 반응
        window.kakao.maps.event.addListener(map, 'center_changed', updateVisibleMarkers);
        window.kakao.maps.event.addListener(map, 'zoom_changed', updateVisibleMarkers);

        return () => {
            window.kakao.maps.event.removeListener(map, 'center_changed', updateVisibleMarkers);
            window.kakao.maps.event.removeListener(map, 'zoom_changed', updateVisibleMarkers);
        };
    }, [searchToggle, markers]);

    return (
        <MapWrapper>
            <OptionWrapper>
                <MapOption>
                <Toggle
                    selected={searchToggle}
                    onClick={handleSearchToggle}
                >
                    {searchToggle && <CheckIcon src={check} />}
                </Toggle>
                    <span>지도 이동시 재검색</span>
                </MapOption>
            </OptionWrapper>
            <MapContainer ref={container} />
        </MapWrapper>
    );

}
