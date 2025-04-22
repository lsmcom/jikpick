import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewTab from '../components/ProductDetail/ReviewTab';
import sellerProfile from '../assets/images/profile1.jpg';
import PageContainer from '../pages/PageContainer';
import cameraIcon from '../assets/icon/Camera.svg'; // 카메라 아이콘 파일을 추가합니다.

const FlexArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: left;
  width: 45%;
`;

const EditButton = styled.button`
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

const SaveButton = styled.button`
  margin-top: 12px;
  align-self: flex-end;
  background-color: #FB4A67;
  color: white;
  font-size: 16px;
  padding: 8px 22px;
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
  align-items: center;
  gap: 24px;
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
  margin-top: 30px;
`;

const Name = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Rating = styled.p`
  font-size: 16px;
  color: #555;
`;

const Description = styled.p`
  margin-top: 0px;
  font-size: 16px;
  color: #555;
`;

const DescriptionTextarea = styled.textarea`
  margin-top: 12px;
  font-size: 16px;
  padding: 10px;
  width: 96%;
  height: 100px;
  resize: none;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

export default function SellerStore() {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('안녕하세요 오로라마켓 믿고 맡겨주세요!');
  const [tempDescription, setTempDescription] = useState(description);
  const [profileImage, setProfileImage] = useState(sellerProfile); // 프로필 사진 상태 관리
  const [newImage, setNewImage] = useState(null); // 새로 선택된 이미지

  const seller = {
    name: '오로라마켓',
    rating: 3.5,
    reviewCount: 21,
    productCount: 6,
    image: profileImage,
  };

  // 프로필 수정 클릭 시
  const handleEditClick = () => {
    setTempDescription(description);
    setIsEditing(true);
  };

  // 프로필 수정 완료 클릭 시
  const handleSaveClick = () => {
    setDescription(tempDescription);
    setIsEditing(false);
    if (newImage) {
      setProfileImage(URL.createObjectURL(newImage)); // 새 이미지로 프로필 이미지 변경
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

  // 수정 후 다시 수정모드로 전환
  const handleReEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <Header />
      <PageContainer>
        <SellerBox>
          <ProfileImageWrapper>
            <ProfileImage src={profileImage} alt="판매자 프로필" />
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
              <Name>{seller.name}</Name>
              <EditButton onClick={isEditing ? handleReEditClick : handleEditClick}>
                {isEditing ? '수정하기' : '프로필 수정'}
              </EditButton>
            </FlexArea>

            <Rating>
              별점 <span style={{ color: '#ffe600' }}>⭐</span> {seller.rating.toFixed(1)} (14) · 후기 {seller.reviewCount} · 상품 {seller.productCount}개
            </Rating>

            {isEditing ? (
              <>
                <DescriptionTextarea
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                />
                <SaveButton onClick={handleSaveClick}>수정 완료</SaveButton>
              </>
            ) : (
              <Description>{description}</Description>
            )}
          </InfoBox>
        </SellerBox>

        <ReviewTab />
      </PageContainer>
      <Footer />
    </>
  );
}
