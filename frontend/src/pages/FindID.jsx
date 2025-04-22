import styled from 'styled-components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

// 📦 전체 화면을 감싸는 Wrapper
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
`;

// 🔷 상단 로고
const Logo = styled(NavLink)`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 64px;
  color: #FB4A67 !important;  // ✅ 색상 강제 적용
  margin-bottom: 40px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &.active {
    color: #FB4A67 !important;  // ✅ active 상태에서도 유지
  }
`;

// 🔲 회원가입 박스 전체
const JoinBox = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 50px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

// 📝 회원가입 제목
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
`;

// 📦 인풋 + 버튼 같이 쓰는 경우 wrapper
const InputWithButton = styled.div`
  position: relative;
  width: 100%;
`;

// 🧾 일반 입력창
const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  padding-right: 100px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 15px;
  box-sizing: border-box;
  margin-bottom: 16px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #FB4A67;
    outline: none;
  }
`;

// ℹ️ 인증 관련 메세지
const Message = styled.div`
  font-size: 13px;
  color: ${({ isValid }) => (isValid ? '#2E8B57' : '#FB4A67')};
  margin-bottom: 16px;
  padding-left: 4px;
  margin-top: -10px;
`;

// ✅ 중복확인, 인증하기, 확인 버튼 스타일 공통
const CheckButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  padding: 7px 12px;
  height: auto;
  line-height: 1;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  margin-top: -8px;

  &:hover {
    background-color: #FB4A67;
    color: white;
  }
`;

// ✅ 아이디찾기 버튼
const FindIDButton = styled.button`
  width: 100%;
  background-color: #FB4A67;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const BottomLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const StyledLink = styled(NavLink)`
  color: #555;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #555;
  }
`;

export default function JoinForm() {
  
  // ✅ 이메일 상태 정의
  const [email, setEmail] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState(null);
  const fakeSentCode = '123456'; //예시로 사용중인 이메일 인증 코드

  // ✅ 아이디 찾기 상태 정의
  const [name, setName] = useState('');

  const dummyUsers = [
    {
      name: '홍길동',
      email: 'test1@email.com',
      id: 'jikpick123',  // ✅ 추가
    },
    {
      name: '김영희',
      email: 'test2@email.com',
      id: 'admin',
    },
    {
      name: '박철수',
      email: 'test3@email.com',
      id: 'user1',
    },
  ];
  
  

  const navigate = useNavigate(); 

  // 이메일 형식 검증 함수
  const isEmailFormat = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleVerifyClick = () => {
    if (!isEmailFormat(email)) {
      setEmailValid(false);
      setShowCodeInput(false);
      return;
    }

    setEmailValid(true);
    setShowCodeInput(true);
    setCodeValid(null);
  };

  // 이메일 인증 코드 검증 함수
  const handleCodeConfirm = () => {
    setCodeValid(code === fakeSentCode);
  };

  // 아이디 찾기 검증 함수
  const handleFindId = () => {
    if (!name || !email || codeValid !== true) {
      alert('모든 정보를 정확히 입력하고 인증을 완료해주세요.');
      return;
    }
  
    const foundUser = dummyUsers.find(
      (user) => user.name === name && user.email === email
    );
  
    if (foundUser) {
      // ✅ 아이디 찾은 경우 해당 페이지로 이동 + 아이디 전달
      navigate('/foundID', {
        state: { foundId: foundUser.id },
      });
    } else {
      alert('일치하는 회원 정보가 없습니다.');
    }
  };

  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <JoinBox>
        <Title>회원가입</Title>

        {/* 이름 */}
        <Input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 이메일 */}
        <InputWithButton>
          <Input
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(true);
            }}
          />
          <CheckButton onClick={handleVerifyClick}>인증하기</CheckButton>
        </InputWithButton>

        {/* ✅ 이메일 형식 체크 메시지 출력 */}
        {!emailValid && (
          <Message isValid={false}>이메일 형식이 아닙니다</Message>
        )}

        {/* 이메일 인증 */}
        {showCodeInput && (
          <>
            <InputWithButton>
              <Input
                type="text"
                placeholder="인증번호 입력"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (e.target.value === '') {
                    setCodeValid(null);
                  }
                }}
              />
              <CheckButton onClick={handleCodeConfirm}>확인</CheckButton>
            </InputWithButton>
            
            {/* ✅ 이메일 인증 메시지 출력 */}
            {codeValid !== null && code && (
              <Message isValid={codeValid}>
                {codeValid ? '인증되었습니다' : '인증번호가 일치하지 않습니다'}
              </Message>
            )}
          </>
        )}

        <FindIDButton onClick={handleFindId}>아이디 찾기</FindIDButton>

        <BottomLinks>
          <StyledLink to="/findPW">비밀번호 찾기</StyledLink>
          <StyledLink to="/login">로그인</StyledLink>
        </BottomLinks>
      </JoinBox>
    </Wrapper>
  );
}
