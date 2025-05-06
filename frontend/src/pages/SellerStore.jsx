import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import ReviewTab from '../components/ProductDetail/ReviewTab';
import sellerProfile from '../assets/images/profile1.jpg';
import PageContainer from '../pages/PageContainer';
import cameraIcon from '../assets/icon/Camera.svg'; // 카메라 아이콘 파일을 추가합니다.
import StarIcon from'../assets/icon/StarIcon.svg';
import axios from '../api/axios';

const FlexArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: left;
  width: 100%;
`;

const EditButton = styled.button`
  background-color: #FB4A67;
  color: white;
  font-size: 16px;
  padding: 5px 12px;
  font-weight: 500;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0405f;
  }
`;

const SaveButton = styled.button`
  margin-top: 12px;
  align-self: flex-end;
  font-weight: 500;
  background-color: #FB4A67;
  color: white;
  font-size: 16px;
  padding: 5px 12px;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0405f;
  }
`;

const SellerBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-top: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 5%;
  object-fit: cover;
`;

const CameraIcon = styled.img`
  position: absolute;
  bottom: 4px;
  right: 0px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #333;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15%;
  padding: 8px;
`;

const FileInput = styled.input`
  display: none;  // 파일 입력은 보이지 않도록 설정
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 500px;
  height: 240px;
`;

const Name = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Rating = styled.p`
  font-size: 20px;
  color: #333;
`;

const Description = styled.p`
  margin-top: 0px;
  font-size: 18px;
  color: #333;
`;

const DescriptionTextarea = styled.textarea`
  margin-top: 12px;
  font-size: 18px;
  padding: 10px;
  width: 96%;
  height: 100px;
  font-family: 'pretendard';
  resize: none;
  border-radius: 10px;
  border: 1px solid #ccc;
`;
const StarImg = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 4px 3px 4px;
  vertical-align: middle;
`;
export default function SellerStore() {
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null); // 새로 선택된 이미지
  const [profileImage, setProfileImage] = useState(''); // 프로필 사진 상태 관리
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [saleCount, setSaleCount] = useState(0);
  const [intro, setIntro] = useState('');
  const [tempIntro, setTempIntro] = useState('');

  const temp = {
    name: '오로라마켓',
    rating: 3.5,
    reviewCount: 21,
    productCount: 6,
    image: profileImage,
  };

  // 프로필 수정 클릭 시
  const handleEditClick = () => {
    setTempIntro(intro);
    setIsEditing(true);
  };

  // 프로필 수정 완료 클릭 시
  const handleSaveClick = async () => {
    setIntro(tempIntro);
    setIsEditing(false);
    if (newImage) {
      setProfileImage(URL.createObjectURL(newImage)); // 새 이미지로 프로필 이미지 변경
    }

    // 서버에 데이터 업데이트 요청 (프로필 이미지와 설명 수정)
    try {
      const formData = new FormData();
      formData.append('image', newImage);
      formData.append('intro', tempIntro);

      await axios.post('/api/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('프로필이 수정되었습니다.');
    } catch (error) {
      console.error('프로필 수정 실패:', error);
    }
  };

  // 파일 선택 시 이미지 업데이트
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setProfileImage(URL.createObjectURL(file)); // 선택된 이미지를 즉시 업데이트하여 미리보기
    }
  };

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const memberId = JSON.parse(localStorage.getItem('user')).id; // localStorage에서 memberId 불러오기
        const userInfo = await axios.get('/api/users/me', {
          params: { userId: memberId }
        });
        console.log(userInfo.data);

        // 서버에서 받은 데이터를 state로 저장
        setProfileImage(userInfo.data.image || sellerProfile);
        setNickname(userInfo.data.nickname);
        setRating(userInfo.data.rating || 0.0);
        setRatingCount(userInfo.data.ratingCount || 0);
        setReviewCount(userInfo.data.reviewCount || 0);
        setSaleCount(userInfo.data.saleCount || 0); // 판매 상품 수
        setIntro(userInfo.data.intro); // 소개글 초기화
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
      }
    };

    fetchSellerInfo();
  }, [profileImage, nickname, rating, ratingCount, reviewCount, saleCount, intro]);

  return (
    <>
      <PageContainer>
        <SellerBox>
          <ProfileImageWrapper>
            <ProfileImage src={profileImage || null} alt="판매자 프로필" />
            {isEditing && (
              <label htmlFor="file-input">
                <CameraIcon src={cameraIcon} alt="카메라 아이콘" />
                <FileInput
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            )}
          </ProfileImageWrapper>
          <InfoBox>
          <FlexArea>
              <Name>{nickname}</Name>
              {!isEditing && (
                <EditButton onClick={handleEditClick}>
                  프로필 수정
                </EditButton>
              )}
            </FlexArea>

            <Rating>
              별점
              <StarImg src={StarIcon} alt="별 아이콘" />
              {rating.toFixed(1)} ({ratingCount}) · 후기 {reviewCount} · 상품 {saleCount}개
            </Rating>

            {isEditing ? (
              <>
                <DescriptionTextarea
                  value={tempIntro}
                  onChange={(e) => setTempIntro(e.target.value)}
                />
                <SaveButton onClick={handleSaveClick}>수정 완료</SaveButton>
              </>
            ) : (
              <Description>{intro}</Description>
            )}
          </InfoBox>
        </SellerBox>

        <ReviewTab />
      </PageContainer>
      <Footer />
    </>
  );
}
