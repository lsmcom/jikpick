import styled from 'styled-components';
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg';
import exampleProfile from '../assets/images/ExampleProfile.svg';
import starIcon from '../assets/icon/StarIcon.svg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
// 📦 뒤로가기 아이콘 스타일
const LeftArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: -5px; 
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 34px;
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding-left: 10px;
`;

const Outer = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 0 80px; /* ⬅️ 아래쪽 패딩으로 푸터 여백 확보 */
  min-height: 70vh; /* ⬅️ 기본 높이 확보 (스크롤 유도용) */
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
  height: 240px; /* 📌 사진 높이에 맞춤 */
  justify-content: center; /* 📌 가운데 정렬 */
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  color: #FB4A67;
  font-weight: bold;
`;

const RatingNum = styled.span`
  padding-left: 5px;
`;

const StarIconImg = styled.img`
  width: 18px;
  height: 18px;
`;

const ReviewCount = styled.span``;


const EditBtn = styled.button`
  background-color: #FB4A67;
  color: white;
  font-size: 16px;
  font-weight: 600; /* 글씨 두께를 700으로 설정 */
  padding: 6px 14px;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0405f;
  }
`;

const InfoLine = styled.div`
  font-size: 20px;
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
  font-size: 20px;
  line-height: 22px;
  height: 36px;
  display: flex;
  align-items: center;
  color: #555;
`;

const Input = styled.input`
  font-size: 20px;
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
  font-size: 20px;
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
  font-size:20px;
  border-radius: 999px;
  border: ${({ variant }) => (variant === 'solid' ? 'none' : '1px solid #ccc')};
  background-color: ${({ variant }) => (variant === 'solid' ? '#FB4A67' : '#fff')};
  color: ${({ variant }) => (variant === 'solid' ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) => (variant === 'solid' ? '#e0405f' : '#f4f4f4')};
  }
`;

// ✅ 인증 관련 메시지 스타일
const Message = styled.div`
  font-size: 16px;
  color: ${({ isValid }) => (isValid ? '#2E8B57' : '#FB4A67')};
  min-height: 22px;
  margin: 1px 0 1px 4px;
`;

// ✅ 코드 확인 버튼 (확인, 재전송 등)
const CodeButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const CodeButton = styled.button`
  padding: 6px 10px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f4f4f4;
  }
`;

const ResendButton = styled(CodeButton)`
  background-color: white;
  color: #333;

  &:hover {
    background-color: #e4e4e4;
  }
`;

export default function ModifyInfo() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // 닉네임 상태 관련
  const [nickname, setNickname] = useState('');

  // 아아디 상태 관련
  const [userId, setUserId] = useState('');

  // 이메일 상태 관련
  const [email, setEmail] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState(null);
  const [sentCode, setSentCode] = useState('');
  
  // 🔥 이메일 인증 추가 상태
  const [emailTimer, setEmailTimer] = useState(0); // 남은 시간(초)
  const [emailExpired, setEmailExpired] = useState(false); // 만료 여부
  const timerRef = useRef(null); // 타이머 저장용 ref

  // 비밀번호 상태 관련
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(null);

  // 전화번호 상태 관련
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [sentPhoneCode, setSentPhoneCode] = useState('');
  const [showPhoneCodeInput, setShowPhoneCodeInput] = useState(false);
  const [phoneCodeValid, setPhoneCodeValid] = useState(null);

  // 비번변경 모달 상태 관련
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [nicknameChecked, setNicknameChecked] = useState(false); // 닉네임 중복확인 통과 여부
  const [emailVerified, setEmailVerified] = useState(false);     // 이메일 인증 완료 여부
  const [phoneVerified, setPhoneVerified] = useState(false);     // 전화번호 인증 완료 여부
  const [passwordChanged, setPasswordChanged] = useState(false); // 비밀번호 변경 여부 (모달에서 완료시 true)

  // ✅ 확인 당시 값 저장
  const [confirmedNickname, setConfirmedNickname] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [confirmedPhone, setConfirmedPhone] = useState('');

  // DB에서 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
    const { id: userId } = stored ? JSON.parse(stored) : {};
  
    if (userId) {
      axios.get(`/api/users/me?userId=${userId}`)
        .then(res => {
          const fullUser = {
            id: res.data.userId,
            nickname: res.data.nickname,
            email: res.data.email,
            phone: res.data.tell,
            password: res.data.password
          };
          localStorage.setItem('user', JSON.stringify(fullUser));
          sessionStorage.setItem('user', JSON.stringify(fullUser));

          setUserId(res.data.userId);
          setNickname(res.data.nickname);
          setEmail(res.data.email);
          setPhone(res.data.tell);
          setPassword(res.data.password);
        })
        .catch(err => {
          console.error('사용자 정보 조회 실패:', err);
        });
    }
  }, []);

  // 닉네임 중복 확인 함수
  const checkNickname = async () => {
    try {
      const res = await axios.post('/api/users/check-nick', { nick: nickname });
      if (res.data.available) {
        alert('사용 가능한 닉네임입니다.');
        setNicknameChecked(true);
        setConfirmedNickname(nickname); // ✅ 확인된 값 저장      
      } else {
        alert('이미 사용 중인 닉네임입니다.');
        setNicknameChecked(false);
      }
    } catch (error) {
      alert('닉네임 중복 확인에 실패했습니다.');
      setNicknameChecked(false);
    }
  };

  // 이메일 형식 검증 함수
  const isEmailFormat = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // ✅ 이메일 인증하기 버튼 클릭 시
  const handleVerifyClick = async () => {
    if (!isEmailFormat(email)) {
      setEmailValid(false);
      setShowCodeInput(false);
      return;
    }
    
    try {
      // 서버에 이메일 인증 요청
      const res = await axios.post('/api/users/send-email', { email });
    
      if (res.status === 200 && res.data.code) {
        alert('인증 코드가 이메일로 발송되었습니다!');
        setEmailValid(true);
        setShowCodeInput(true);
        setCodeValid(null);
    
        // 인증번호 저장
        setSentCode(res.data.code); // ✅ 서버에서 받은 인증번호는 별도로 저장만!
    
        // 🔥 타이머 시작
        clearInterval(timerRef.current);
        setEmailTimer(300); // 5분(300초) 설정
        setEmailExpired(false);
    
        timerRef.current = setInterval(() => {
          setEmailTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              setEmailExpired(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      console.error('이메일 인증 요청 실패:', error);
      alert('이메일 인증 요청에 실패했습니다.');
    }
  };
  
  // 이메일 인증 코드 검증 함수
  const handleCodeConfirm = () => {
    if (emailExpired) {
      setEmailVerified(false);
      return alert('인증 시간이 만료되었습니다. 다시 인증 요청해주세요.');
    }
  
    const success = code === sentCode;
    setCodeValid(success);          
    setEmailVerified(success);     
  
    if (success) {
      setConfirmedEmail(email);   
    }
  };

  // 인증 요청 함수 (번호 입력하고 ‘인증하기’ 누를 때)
  const handlePhoneVerifyClick = () => {
    // 가짜 인증번호 생성 (ex. 654321)
    const code = '654321';
    setSentPhoneCode(code);
    setShowPhoneCodeInput(true);
    setPhoneCodeValid(null);
    alert('인증번호가 발송되었습니다 (예: 654321)');
  };

  // 인증번호 확인 함수
  const handlePhoneCodeConfirm = () => {
    const success = phoneCode === sentPhoneCode;
    setPhoneCodeValid(success);
    if (success) {
      setPhoneVerified(true);
      setConfirmedPhone(phone);
    } else {
      setPhoneVerified(false);
    }
  };


  // 수정 완료 처리 함수
  const handleSave = async () => {
    const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
    const original = stored ? JSON.parse(stored) : {};
  
    const updatedFields = {
      userId, // ✅ 무조건 포함
    };
  
    // 변경된 항목만 updatedFields에 추가
    if (nickname !== original.nickname) updatedFields.nickname = nickname;
    if (email !== original.email) updatedFields.email = email;
    if (phone !== original.phone) updatedFields.tell = phone;
  
    // 비밀번호 변경 체크 및 업데이트
    if (passwordChanged && newPassword !== null && newPassword !== '') {
      updatedFields.password = newPassword;
    }
  
    if (Object.keys(updatedFields).length === 0) {
      alert('변경된 정보가 없습니다.');
      return;
    }
  
    try {
      await axios.post('/api/users/update', updatedFields);
      alert('회원 정보가 성공적으로 수정되었습니다.');
  
      // local/sessionStorage도 최신값으로 갱신
      const newUserData = {
        ...original,
        ...updatedFields,
      };
      localStorage.setItem('user', JSON.stringify(newUserData));
      sessionStorage.setItem('user', JSON.stringify(newUserData));
    } catch (err) {
      console.error('회원 정보 수정 실패:', err);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
      const original = stored ? JSON.parse(stored) : {};
  
      const nicknameChanged = nickname !== original.nickname;
      const emailChanged = email !== original.email;
      const phoneChanged = phone !== original.phone;
  
      // ❌ 변경된 경우에만 확인 체크
      if (
        (nicknameChanged && nickname !== confirmedNickname && !nicknameChecked) ||
        (emailChanged && email !== confirmedEmail && !emailVerified) ||
        (phoneChanged && phone !== confirmedPhone && !phoneVerified) ||
        (passwordChanged && newPassword === null)
      ) {
        return alert('변경한 항목에 대해 중복 확인 및 인증을 완료해주세요.');
      }
  
      handleSave();
      setIsEditing(false);

      setShowCodeInput(false);
      setShowPhoneCodeInput(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Wrapper>
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
                      <Input
                        value={nickname}
                        onChange={(e) => {
                          setNickname(e.target.value);
                        }}
                      />
                      <RightButton onClick={checkNickname}>중복확인</RightButton>
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

                  <EditBtn onClick={handleEditClick}>
                    {isEditing ? '수정 완료' : '회원정보 수정'}
                  </EditBtn>
                </NicknameRow>
              </InfoLine>

              {!isEditing && (
                <InfoLine>
                  {/* isEditing이 false일 때만 표시할 내용 */}
                  <Label>아이디</Label>
                  <StaticText>{userId}</StaticText>
                </InfoLine>
              )}

              <InfoLine>
                <Label>이메일</Label>
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Input
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailValid(true);
                        }}
                      />
                      <RightButton onClick={handleVerifyClick}>인증하기</RightButton>
                    </div>

                    {!emailValid && (
                      <Message isValid={false}>이메일 형식이 아닙니다</Message>
                    )}
                  </div>
                ) : (
                  <StaticText>{email}</StaticText>
                )}
              </InfoLine>

              {showCodeInput && (
                <>
                  {/* 메일 인증 줄 */}
                  <InfoLine style={{ alignItems: 'flex-start' }}>
                    <Label style={{ paddingTop: '12px' }}>메일 인증</Label>
                      
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Input
                          type="text"
                          placeholder="인증번호 입력"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                            if (e.target.value === '') setCodeValid(null);
                          }}
                        />
                        {!emailExpired ? (
                          <RightButton onClick={handleCodeConfirm}>인증확인</RightButton>
                        ) : (
                          <RightButton onClick={handleVerifyClick}>다시 보내기</RightButton>
                        )}
                      </div>

                      {/* 🔻 여기 메시지들 포함 */}
                      {emailExpired ? (
                        <Message isValid={false}>인증 시간이 만료되었습니다.</Message>
                      ) : (
                        <Message isValid={true}>
                          남은 시간 {Math.floor(emailTimer / 60)}:{String(emailTimer % 60).padStart(2, '0')}
                        </Message>
                      )}

                      {codeValid !== null && code && (
                        <Message isValid={codeValid}>
                          {codeValid ? '인증되었습니다' : '인증번호가 일치하지 않습니다'}
                        </Message>
                      )}
                    </div>
                  </InfoLine>
                </>
              )}

              <InfoLine>
                <Label>비밀번호</Label>
                {isEditing ? (
                  <>
                    <Input type="password" value={'********'.slice(0, 8)} disabled />
                    <RightButton onClick={() => setShowPasswordModal(true)}>변경하기</RightButton>
                  </>
                ) : (
                  <StaticText>{'********'.slice(0, 8)}</StaticText>
                )}
              </InfoLine>

              {showPasswordModal && (
                <PasswordModal
                  currentPassword={password}
                  onPasswordChange={(pw) => {
                    setNewPassword(pw);
                    setPasswordChanged(true);
                    setShowPasswordModal(false);
                  }}
                  onClose={() => setShowPasswordModal(false)}
                />
              )}

              <InfoLine>
                <Label>전화번호</Label>
                {isEditing ? (
                    <>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                      <RightButton onClick={handlePhoneVerifyClick}>인증하기</RightButton>
                    </>
                  ) : (
                    <StaticText>{phone}</StaticText>
                  )}
              </InfoLine>

              {showPhoneCodeInput && (
                <InfoLine style={{ alignItems: 'flex-start' }}>
                  <Label style={{ paddingTop: '12px' }}>번호 인증</Label>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Input
                        type="text"
                        placeholder="인증번호 입력"
                        value={phoneCode}
                        onChange={(e) => {
                          setPhoneCode(e.target.value);
                          if (e.target.value === '') setPhoneCodeValid(null);
                        }}
                      />
                      <RightButton onClick={handlePhoneCodeConfirm}>인증확인</RightButton>
                    </div>

                    {phoneCodeValid !== null && phoneCode && (
                      <Message isValid={phoneCodeValid}>
                        {phoneCodeValid ? '인증되었습니다' : '인증번호가 일치하지 않습니다'}
                      </Message>
                    )}
                  </div>
                </InfoLine>
              )}
            </UserTextBox>
          </UserInfoBox>
        </Inner>
      </Outer>
      <Footer />   
    </Wrapper>
  );
}

function PasswordModal({ currentPassword, onPasswordChange, onClose }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChangePassword = async () => {
    const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
    const currentUser = stored ? JSON.parse(stored) : {};
  
    try {
      const res = await axios.post('/api/users/check-password', {
        userId: currentUser.id,
        password: current
      });
  
      if (!res.data) return alert('현재 비밀번호가 일치하지 않습니다.');
      if (newPass.length < 8) return alert('새 비밀번호는 최소 8자 이상이어야 합니다.');
      if (newPass !== confirm) return alert('새 비밀번호가 일치하지 않습니다.');
  
      onPasswordChange(newPass);
    } catch (err) {
      alert('비밀번호 확인 중 오류 발생');
    }
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <h3>비밀번호 변경</h3>
        <Input placeholder="현재 비밀번호" type="password" value={current} onChange={e => setCurrent(e.target.value)} />
        <Input placeholder="새 비밀번호" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} />
        <Input placeholder="새 비밀번호 확인" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        <ModalButtonRow>
          <ModalButton variant="outline" onClick={onClose}>취소</ModalButton>
          <ModalButton variant="solid" onClick={handleChangePassword}>변경</ModalButton>
        </ModalButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
}