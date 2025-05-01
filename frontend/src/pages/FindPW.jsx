import { useRef, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Wrapper, Logo } from '../pages/LoginContainer';
import axios from '../api/axios';

const Box = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 50px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
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
  font-size: 16px;
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

// 🔥 인증번호 입력창 버튼 묶는 박스 (확인 + 다시 보내기)
const CodeButtonGroup = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
`;

// CodeButtonGroup 안에 있는 버튼 스타일 조정
const CodeButton = styled(CheckButton)`
  position: static;
  margin-top: -15px;
  transform: none;
  height: 29px;  // 높이 통일
  padding: 0 12px; // 좌우 여백 통일
  font-size: 14px;
  border: 1px solid #aaa;
  background-color: white;
  color: #555;
  &:hover {
    background-color: #FB4A67;
    color: white;
    border: none;
  }
`;

// ✅ 다시 보내기 버튼 (CheckButton과 거의 같지만 약간 넓게)
const ResendButton = styled.button`
  padding: 7px 16px;   // 🔥 살짝 더 넓은 패딩
  height: auto;
  line-height: 1;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  margin-top: -15px;

  &:hover {
    background-color: #FB4A67;
    color: white;
    border: none;
  }
`;

const MainButton = styled.button`
  display: block;
  width: 100%;
  background-color: #FB4A67;
  color: white;
  color: white !important; 
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin: 20px 0;
  text-align: center;
  text-decoration: none;
`;

const FooterLinks = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
  color: #555;

  a {
    text-decoration: none;
    color: #555;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function FindPassword() {

  const navigate = useNavigate();
 
  // ✅ 아이디 상태 정의
  const [id, setId] = useState('');

  // ✅ 이름 상태 정의
  const [name, setName] = useState('');
  
  // ✅ 이메일 상태 정의
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
      setCodeValid(false); // 🔥 만료됐으면 무조건 실패
      alert('인증 시간이 만료되었습니다. 다시 인증을 요청해주세요.');
      return;
    }
  
    setCodeValid(code === sentCode);
  };

  // 비밀번호 찾기 버튼 검증 함수
  const handleFindPassword = async () => {
    if (!id || !name || !email || codeValid !== true) {
      alert('모든 정보를 정확히 입력하고 인증을 완료해주세요.');
      return;
    }
  
    try {
      const res = await axios.post('/api/users/verify-user', {
        id,
        name,
        email,
      });
  
      if (res.data.success) {
        navigate('/resetPW', { state: { id } });
      } else {
        alert('일치하는 회원 정보가 없습니다.');
      }
    } catch (error) {
      console.error('비밀번호 찾기 실패:', error);
      alert('비밀번호 찾기에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <Box>
        <Title>비밀번호 찾기</Title>

        {/* 아이디 */}
        <Input
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

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

              {/* 🔥 확인 + 다시 보내기 버튼 */}
              <CodeButtonGroup>
                {/* 만료되기 전이면 '확인' 버튼 보여줌 */}
                {!emailExpired && (
                  <CodeButton onClick={handleCodeConfirm}>확인</CodeButton>
                )}

                {/* 만료되었으면 '다시 보내기' 버튼만 보여줌 */}
                {emailExpired && (
                  <ResendButton onClick={handleVerifyClick}>다시 보내기</ResendButton>
                )}
              </CodeButtonGroup>
            </InputWithButton>

            {/* 🔥 이메일 인증 유효시간/만료/재전송 */}
            {showCodeInput && (
              <>
                {emailExpired ? (
                  <Message isValid={false}>
                    인증 시간이 만료되었습니다.
                  </Message>
                ) : (
                  <Message isValid={true}>
                    남은 시간 {Math.floor(emailTimer / 60)}:{String(emailTimer % 60).padStart(2, '0')}
                  </Message>
                )}
              </>
            )}
            
            {/* ✅ 이메일 인증 메시지 출력 */}
            {codeValid !== null && code && (
              <Message isValid={codeValid}>
                {codeValid ? '인증되었습니다' : '인증번호가 일치하지 않습니다'}
              </Message>
            )}
          </>
        )}

        <MainButton onClick={handleFindPassword}>비밀번호 찾기</MainButton>

        <FooterLinks>
          <NavLink to="/findID">아이디 찾기</NavLink>
          <NavLink to="/login">로그인</NavLink>
        </FooterLinks>
      </Box>
    </Wrapper>
  );
}
