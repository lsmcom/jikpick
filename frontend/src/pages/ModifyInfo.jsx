import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg';
import exampleProfile from '../assets/images/ExampleProfile.svg';
import starIcon from '../assets/icon/StarIcon.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Outer = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 16px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 32px 0; /* 제목 영역 여백 추가 */
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 34px; 
`;


const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  line-height: 1;  /* ✨ baseline 정렬 보정 */
  margin: 0;
`;


const LeftArrowIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 12px;
  cursor: pointer;
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 20px 0;
  margin-top: 10px; /* ✨ 추가 */
`;

const ProfileImgBox = styled.div`
  width: 240px;
  height: 240px;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  margin-top: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  color: #D30000;
  font-weight: bold;
`;

const RatingNum = styled.span`
  padding-left: 5px;
`;

const StarIconImg = styled.img`
  width: 16px;
  height: 16px;
`;

const ReviewCount = styled.span``;


const EditBtn = styled.button`
  background-color: #FB4A67;
  color: white;
  font-size: 14px;
  padding: 6px 14px;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0405f;
  }
`;

const InfoLine = styled.div`
  font-size: 16px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.span`
  display: inline-block;
  width: 80px;
  font-weight: 600;
  color: #222;
`;

const StaticText = styled.span`
  font-size: 16px;
  line-height: 22px;
  height: 36px;
  display: flex;
  align-items: center;
  color: #555;
`;

const Input = styled.input`
  font-size: 15px;
  padding: 6px 10px;
  line-height: 22px;  /* ✨ 고정된 텍스트 라인 높이 */
  height: 20px;       /* ✨ 정적인 높이 지정 */
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 280px;
  background-color: #fff;
`;

const RightButton = styled.button`
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f4f4f4;
  }

  
`;

const NicknameRow = styled.div`
  display: flex;
  align-items: center;       // 수직 가운데 정렬 유지
  gap: 10px;                 // 간격 조정 (기존 14px → 10px 권장)
  flex-wrap: wrap;          // 너무 좁아지면 줄바꿈 허용 (옵션)
`;





export default function ModifyInfo() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [nickname, setNickname] = useState('오로라마켓');
  const [userId, setUserId] = useState('ojy1739');
  const [email, setEmail] = useState('ojy1739@naver.com');
  const [password, setPassword] = useState('**************');
  const [phone, setPhone] = useState('010 5014 7885');
  const [showPasswordModal, setShowPasswordModal] = useState(false);


  return (
    <Wrapper>
      <Header />
      <Outer>
        <Inner>
          <TitleBox>
            <LeftArrowIcon src={leftArrow} alt="뒤로가기" onClick={() => navigate(-1)} />
            <Title>회원정보 관리</Title>
          </TitleBox>

          <UserInfoBox>
            <ProfileImgBox>
              <ProfileImage src={exampleProfile} alt="프로필 이미지" />
            </ProfileImgBox>

            <UserTextBox>

            <InfoLine>
              <Label>닉네임</Label>
              <NicknameRow>
                {isEditing ? (
                  <>
                    <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
                    <RightButton onClick={() => alert('닉네임 중복 확인')}>중복확인</RightButton>
                  </>
                ) : (
                  <StaticText>{nickname}</StaticText>
                )}

                {/* ✅ isEditing일 때는 별점 숨기기 */}
                {!isEditing && (
                  <Rating>
                    <RatingNum>3.5</RatingNum>
                    <StarIconImg src={starIcon} alt="별점" />
                    <ReviewCount>(4)</ReviewCount>
                  </Rating>
                )}

                <EditBtn onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? '수정 완료' : '회원정보 수정'}
                </EditBtn>
              </NicknameRow>
            </InfoLine>



              <InfoLine>
                <Label>아이디</Label>
                {isEditing ? (
                  <>
                    <Input value={userId} onChange={(e) => setUserId(e.target.value)} />
                    <RightButton onClick={() => alert('아이디 중복 확인')}>중복확인</RightButton>
                  </>
                ) : (
                  <StaticText>{userId}</StaticText>
                )}
              </InfoLine>

              <InfoLine>
                  <Label>이메일</Label>
                  {isEditing ? (
                    <>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                      <RightButton onClick={() => alert('이메일 인증 요청')}>인증하기</RightButton>
                    </>
                  ) : (
                    <StaticText>{email}</StaticText>
                  )}
              </InfoLine>


              <InfoLine>
                  <Label>비밀번호</Label>
                  {isEditing ? (
                    <>
                      <Input type="password" value={password} disabled />
                      <RightButton onClick={() => setShowPasswordModal(true)}>변경하기</RightButton>
                    </>
                  ) : (
                    <StaticText>{password}</StaticText>
                  )}
                </InfoLine>

              <InfoLine>
                <Label>전화번호</Label>
                {isEditing ? (
                    <>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                      <RightButton onClick={() => alert('번호 인증 요청')}>인증하기</RightButton>
                    </>
                  ) : (
                    <StaticText>{phone}</StaticText>
                  )}
              </InfoLine>
            </UserTextBox>
          </UserInfoBox>
        </Inner>
      </Outer>
      <Footer />


      {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}





    </Wrapper>
  );
}

function PasswordModal({ onClose }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChangePassword = () => {
    if (current !== '**************') return alert('현재 비밀번호가 일치하지 않습니다.');
    if (newPass.length < 8) return alert('새 비밀번호는 최소 8자 이상이어야 합니다.');
    if (newPass !== confirm) return alert('새 비밀번호가 일치하지 않습니다.');
    alert('비밀번호가 성공적으로 변경되었습니다.');
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <h3>비밀번호 변경</h3>
        <Input
          placeholder="현재 비밀번호"
          type="password"
          value={current}
          onChange={e => setCurrent(e.target.value)}
        />
        <Input
          placeholder="새 비밀번호"
          type="password"
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
        />
        <Input
          placeholder="새 비밀번호 확인"
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <ModalButtonRow>
          <ModalButton variant="outline" onClick={onClose}>취소</ModalButton>
          <ModalButton variant="solid" onClick={handleChangePassword}>변경</ModalButton>
        </ModalButtonRow>

      </ModalBox>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const ModalButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 999px;
  border: ${({ variant }) => (variant === 'solid' ? 'none' : '1px solid #ccc')};
  background-color: ${({ variant }) => (variant === 'solid' ? '#FB4A67' : '#fff')};
  color: ${({ variant }) => (variant === 'solid' ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) => (variant === 'solid' ? '#e0405f' : '#f4f4f4')};
  }
`;



