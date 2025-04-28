import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dropDown2 from '../assets/icon/DropDown2.svg'
import checkIcon from '../assets/icon/checkIcon.svg'
import checkFilledIcon from '../assets/icon/CheckCircleFill.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { Wrapper, Logo } from '../pages/LoginContainer';
<<<<<<< HEAD
import { join } from "../assets/api/auth.js";
=======
import axios from '../api/axios'; 
>>>>>>> 43d95ece33133920abc3dfc6cdcce2568dd5a8b0

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
  padding-right: 10px;
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
    border: none;
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

// 🔐 아이디 확인 메세지
const IdMessage = styled.div`
  font-size: 16px;
  color: ${({ isValid }) => (isValid ? '#2E8B57' : '#FB4A67')};
  margin-top: -10px;
  margin-bottom: 16px;
  padding-left: 4px;
`;

// 🔐 비밀번호 확인 메세지
const PasswordMessage = styled.div`
  font-size: 16px;
  color: ${({ isMatch }) => (isMatch ? '#2E8B57' : '#FB4A67')};
  margin-top: -10px;
  margin-bottom: 16px;
  padding-left: 4px;
`;

// ℹ️ 인증 관련 메세지
const Message = styled.div`
  font-size: 16px;
  color: ${({ isValid }) => (isValid ? '#2E8B57' : '#FB4A67')};
  margin-bottom: 16px;
  padding-left: 4px;
  margin-top: -10px;
`;

// ✅ 생년월일 메시지
const BirthMessage = styled.div`
  font-size: 16px;
  color: ${({ isValid }) => (isValid ? '#2E8B57' : '#FB4A67')};
  margin-top: -10px;
  margin-bottom: 16px;
  padding-left: 4px;
`;

// 📞 전화번호 + 통신사 줄 묶음
const PhoneRow = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

// 📶 통신사 셀렉트 박스
const CarrierSelect = styled.select`
  width: 110px;
  height: 48px;
  padding: 0 10px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 12px 0 0 12px;
  background-color: white;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url('/assets/icon/DropDown2.svg');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;

  &:focus {
    border-color: #FB4A67;
    outline: none;
  }
`;

// 📲 전화번호 입력 wrapper
const PhoneInputWrapper = styled.div`
  position: relative;
  width: 100%;

  input:focus {
    border-color: #FB4A67;
    outline: none;
  }
`;

// ☎️ 전화번호 인풋 스타일
const PhoneInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  padding-right: 100px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 0 12px 12px 0;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #FB4A67;
  }
`;

// 📮 전화번호 인증 버튼
const TellCheckButton = styled.button`
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

  &:hover {
    background-color: #FB4A67;
    color: white;
    border: none;
  }
`;

// ✅ 성별/내외국인 선택 전체 영역을 감싸는 박스 (하나의 UI처럼 보이게 구성)
const GenderNationalityBox = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
`;

// ✅ 성별 또는 내외국인 중 하나의 선택 그룹 박스 (좌우 각각)
// 포커스 여부에 따라 테두리 강조가 들어감
const SelectionGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  padding: 14px 0;
  background-color: white;
  border: 1px solid ${({ isFocused }) => (isFocused ? '#FB4A67' : '#ddd')};

  &:first-child {
    border-radius: 12px 0 0 12px;
  }

  &:last-child {
    border-radius: 0 12px 12px 0;
  }
`;

// ✅ 실제 라디오 버튼은 숨기고, 라벨로 대체하는 구조
const CustomRadio = styled.input`
  display: none;
`;

// ✅ 라벨 클릭 시 선택되도록, 라디오 버튼을 시각적으로 표현하는 역할
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: #333;
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #333;
    background-color: ${({ checked }) => (checked ? '#000' : '#fff')};
  }
`;

// ✅ 약관 동의 항목 Wrapper
const TermsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
  font-size: 15px;
  color: #555;
  background-color: #fff;
  cursor: pointer;
`;

const TermsLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ArrowIcon = styled.img`
  width: 18px;
  height: 18px;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0)')};
  transition: 0.2s;
`;

const TermsDetailBox = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TermsItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TermsCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #FB4A67;
`;

// ✅ 회원가입 제출 버튼
const JoinButton = styled.button`
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

export default function JoinForm() {

  // ✅ 아이디 상태 정의
  const [id, setId] = useState('');
  const [idValid, setIdValid] = useState(null); // true/false/null

  // ✅ 비밀번호 상태 정의
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // ✅ 이메일 상태 정의
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState(null);
  const [realEmailCode, setRealEmailCode] = useState(''); // 🔥 서버에서 받은 진짜 인증번호 저장

  // 🔥 이메일 인증 추가 상태
  const [emailTimer, setEmailTimer] = useState(0); // 남은 시간(초)
  const [emailExpired, setEmailExpired] = useState(false); // 만료 여부
  const timerRef = useRef(null); // 타이머 저장용 ref

  // ✅ 닉네임 상태 정의
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(null);

  // ✅ 생년월일 상태 정의
  const [birth, setBirth] = useState('');
  const [birthValid, setBirthValid] = useState(null);

  // ✅ 전화번호 상태 정의
  const [phone, setPhone] = useState('');
  const [showPhoneCodeInput, setShowPhoneCodeInput] = useState(false);
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneCodeValid, setPhoneCodeValid] = useState(null);
  const [carrier, setCarrier] = useState('');
  const fakePhoneCode = '654321'; // 전화번호 예시 인증번호

  // ✅ 성별 및 내외국인 상태 정의
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  // 🔥 포커스 상태를 위한 상태 추가
  const [genderFocused, setGenderFocused] = useState(false);
  const [nationalityFocused, setNationalityFocused] = useState(false);

  // ✅ 약관 상태 정의
  const [allAgreed, setAllAgreed] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    location: false
  });

  const navigate = useNavigate(); // ✅ 로그인 페이지로 이동을 위한 훅
  
  // ✅ 아이디 중복확인
  const handleCheckId = async () => {
    if (id.trim() === '') return;
  
    try {
      // ✅ 서버로 POST 요청 보내서 아이디 중복 확인
      const response = await axios.post('/api/users/check-id', { id: id.trim() });
      
      if (response.data.available) {
        setIdValid(true); // 사용 가능
      } else {
        setIdValid(false); // 사용 불가능
      }
    } catch (error) {
      console.error('아이디 중복확인 오류:', error);
      alert('아이디 중복확인 중 오류가 발생했습니다.');
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
        setRealEmailCode(res.data.code); // ✅ 서버에서 받은 인증번호는 별도로 저장만!
  
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
  
    setCodeValid(code === realEmailCode);
  };

  // ✅ 컴포넌트가 언마운트(화면에서 사라질 때) 될 때, 남아있는 타이머를 정리해주는 역할
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current); // 🔥 메모리 누수 방지: 타이머 정리
    };
  }, []);

  // ✅ 닉네임 중복확인
  const handleCheckNickname = async () => {
    if (nickname.trim() === '') return;

    try {
      const response = await axios.post('/api/users/check-nick', { nick: nickname });
      setNicknameValid(response.data.available);
    } catch (error) {
      console.error('닉네임 중복확인 에러:', error);
      setNicknameValid(false);
    }
  };

  // ✅ 생년월일 형식 검증 함수
  const handleBirthChange = (e) => {
    const value = e.target.value;
    setBirth(value);
    setBirthValid(/^[0-9]{6}$/.test(value));
  };

  // ✅ 전화번호 인증하기 버튼 클릭 시 처리
  const handlePhoneVerifyClick = () => {
    // ❌ 통신사 미선택
    if (!carrier) {
      alert('통신사를 선택해주세요.');
      return;
    }
  
    // ❌ 전화번호 형식 오류 (숫자만, 최소 9~11자리)
    const phonePattern = /^\d{9,11}$/;
    if (!phonePattern.test(phone)) {
      alert('전화번호 형식이 올바르지 않습니다. 숫자만 입력해주세요.');
      return;
    }
  
    // ✅ 조건 통과
    setShowPhoneCodeInput(true);
    setPhoneCodeValid(null);
  };
  
  // ✅ 전화번호 확인 버튼 클릭 시 처리
  const handlePhoneCodeConfirm = () => {
    setPhoneCodeValid(phoneCode === fakePhoneCode);
  };

  const handleToggleAllAgree = () => {
    const next = !allAgreed;
    setAllAgreed(next);
    setAgreements({
      terms: next,
      privacy: next,
      location: next
    });
  };

  const handleToggleEach = (key) => {
    const next = { ...agreements, [key]: !agreements[key] };
    setAgreements(next);
    setAllAgreed(Object.values(next).every(Boolean));
  };

  // ✅ 회원가입 유효성 검사 및 제출
  const handleSubmit = async () => {
<<<<<<< HEAD
    if (!id || idValid === false) return alert('아이디를 확인해주세요.');
    if (!password || password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');
    if (!email || codeValid !== true) return alert('이메일 인증을 완료해주세요.');
    if (!nickname || nicknameValid === false) return alert('닉네임을 확인해주세요.');
    if (!carrier || !phone || phoneCodeValid !== true) return alert('전화번호 인증을 완료해주세요.');
    if (!birth || !birthValid) return alert('생년월일 6자리를 정확히 입력해주세요.');
    if (!gender || !nationality) return alert('성별 및 내외국인을 선택해주세요.');
    if (!agreements.terms || !agreements.privacy || !agreements.location) return alert('약관에 모두 동의해주세요.');
  
    try {
      // 🔥 여기서 서버에 회원가입 요청
      const response = await join(id, password, nickname);
      
      if (response.success) {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } else {
        alert(response.message); // 서버에서 보내준 실패 메시지
      }
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다.');
=======
    // 1. 아이디 중복확인 안했으면 막기
    if (!id || idValid !== true) return alert('아이디 중복확인을 완료해주세요.');

    // 2. 비밀번호 조건
    if (!password || password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');

    // 3. 이메일 인증 완료 조건
    if (!email || codeValid !== true) return alert('이메일 인증을 완료해주세요.');

    // 4. 닉네임 중복확인 안했으면 막기
    if (!nickname || nicknameValid !== true) return alert('닉네임 중복확인을 완료해주세요.');

    // 5. 전화번호 인증 완료 조건
    if (!carrier || !phone || phoneCodeValid !== true) return alert('전화번호 인증을 완료해주세요.');

    // 6. 생년월일 조건
    if (!birth || !birthValid) return alert('생년월일 6자리를 정확히 입력해주세요.');

    // 7. 성별/내외국인 선택 조건
    if (!gender || !nationality) return alert('성별 및 내외국인을 선택해주세요.');

    // 8. 약관 동의 조건
    if (!agreements.terms || !agreements.privacy || !agreements.location) return alert('약관에 모두 동의해주세요.');
  
    try {
      const response = await axios.post('/api/users/join', {
        id,
        password,
        name, 
        nick: nickname,
        email,
        tell: phone,
        agency: carrier,
        sex: gender,
        national: nationality,
        birth,
      });
  
      if (response.status === 200) {
        alert('회원가입 완료!');
        navigate('/login');
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입이 실패하였습니다.');
>>>>>>> 43d95ece33133920abc3dfc6cdcce2568dd5a8b0
    }
  };
  

  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <JoinBox>
        <Title>회원가입</Title>

        {/* ✅ 아이디 입력 + 버튼 */}
        <InputWithButton>
          <Input
            placeholder="아이디"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setIdValid(null); // 입력 중엔 메시지 초기화
            }}
          />
          <CheckButton onClick={handleCheckId}>중복확인</CheckButton>
        </InputWithButton>

        {/* ✅ 아이디 중복 확인 메시지 출력 */}
        {id && idValid !== null && (
          <IdMessage isValid={idValid}>
            {idValid ? '사용 가능한 아이디입니다' : '이미 사용 중인 아이디입니다'}
          </IdMessage>
        )}

        {/* 비밀번호 */}
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 재입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* ✅ 비밀번호 확인 메시지 출력 */}
        {confirmPassword && (
          <PasswordMessage isMatch={password === confirmPassword}>
            {password === confirmPassword
              ? '사용 가능한 비밀번호입니다'
              : '입력한 비밀번호와 다릅니다'}
          </PasswordMessage>
        )}

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

        {/* 닉네임 */}
        <InputWithButton>
          <Input
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameValid(null); // 입력 중이면 메시지 초기화
            }}
          />
          <CheckButton onClick={handleCheckNickname}>중복확인</CheckButton>
        </InputWithButton>

        {/* ✅ 닉네임 중복 체크 메시지 출력 */}
        {nickname && nicknameValid !== null && (
          <IdMessage isValid={nicknameValid}>
            {nicknameValid ? '사용 가능한 닉네임입니다' : '이미 사용 중인 닉네임입니다'}
          </IdMessage>
        )}

        {/* 이름 */}
        <Input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 생년월일 */}
        <Input
          placeholder="생년월일 (예: 990101)"
          value={birth}
          onChange={handleBirthChange}
          maxLength={6}
        />
        {birth && birthValid !== null && (
          <BirthMessage isValid={birthValid}>
            {birthValid ? '올바른 생년월일 형식입니다' : '6자리 숫자로 입력해주세요'}
          </BirthMessage>
        )}

        {/* 전화번호 + 통신사 */}
        <PhoneRow>
          <CarrierSelect
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          >
            <option value="">통신사</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LG">LG</option>
            <option value="알뜰폰">알뜰폰</option>
          </CarrierSelect>

          <PhoneInputWrapper>
            <PhoneInput
              placeholder="숫자만 입력하세요"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TellCheckButton onClick={handlePhoneVerifyClick}>인증하기</TellCheckButton>
          </PhoneInputWrapper>
        </PhoneRow>

        {/* ✅ 전화번호 인증 */}
        {showPhoneCodeInput && (
          <>
            <InputWithButton>
              <Input
                type="text"
                placeholder="인증번호 입력"
                value={phoneCode}
                onChange={(e) => {
                  setPhoneCode(e.target.value);
                  if (e.target.value === '') {
                    setPhoneCodeValid(null);
                  }
                }}
              />
              <CheckButton onClick={handlePhoneCodeConfirm}>확인</CheckButton>
            </InputWithButton>

            {/* ✅ 전화번호 인증 메시지 출력 */}
            {phoneCodeValid !== null && phoneCode && (
              <Message isValid={phoneCodeValid}>
                {phoneCodeValid ? '인증되었습니다' : '인증번호가 일치하지 않습니다'}
              </Message>
            )}
          </>
        )}

        {/* ✅ 성별 / 내외국인 선택 */}
        <GenderNationalityBox>
          {/* ✅ 성별 선택 */}
          <SelectionGroup
            isFocused={genderFocused}
            onFocus={() => setGenderFocused(true)}
            onBlur={() => setGenderFocused(false)}
            tabIndex={-1}
          >
            <CustomRadio
              id="male"
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            <RadioLabel htmlFor="male" checked={gender === 'male'}>남자</RadioLabel>

            <CustomRadio
              id="female"
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            <RadioLabel htmlFor="female" checked={gender === 'female'}>여자</RadioLabel>
          </SelectionGroup>

          {/* ✅ 내외국인 선택 */}
          <SelectionGroup
            isFocused={nationalityFocused}
            onFocus={() => setNationalityFocused(true)}
            onBlur={() => setNationalityFocused(false)}
            tabIndex={-1}
          >
            <CustomRadio
              id="domestic"
              type="radio"
              name="nationality"
              value="domestic"
              checked={nationality === 'domestic'}
              onChange={() => setNationality('domestic')}
            />
            <RadioLabel htmlFor="domestic" checked={nationality === 'domestic'}>내국인</RadioLabel>

            <CustomRadio
              id="foreigner"
              type="radio"
              name="nationality"
              value="foreigner"
              checked={nationality === 'foreigner'}
              onChange={() => setNationality('foreigner')}
            />
            <RadioLabel htmlFor="foreigner" checked={nationality === 'foreigner'}>외국인</RadioLabel>
          </SelectionGroup>
        </GenderNationalityBox>

        {/* ✅ 약관 전체 동의 */}
        <TermsBox onClick={handleToggleAllAgree}>
          <TermsLabel>
            <CheckIcon src={allAgreed ? checkFilledIcon : checkIcon} alt="check" />
            <span>[필수] 인증 약관 전체 동의</span>
          </TermsLabel>
          <ArrowIcon src={dropDown2} alt="arrow" open={openTerms} onClick={(e) => { e.stopPropagation(); setOpenTerms(!openTerms); }} />
        </TermsBox>

        {openTerms && (
          <TermsDetailBox>
            <TermsItem>
              <TermsCheckbox type="checkbox" checked={agreements.terms} onChange={() => handleToggleEach('terms')} />
              이용약관 동의 (필수)
            </TermsItem>
            <TermsItem>
              <TermsCheckbox type="checkbox" checked={agreements.privacy} onChange={() => handleToggleEach('privacy')} />
              개인정보 처리방침 동의 (필수)
            </TermsItem>
            <TermsItem>
              <TermsCheckbox type="checkbox" checked={agreements.location} onChange={() => handleToggleEach('location')} />
              위치기반 서비스 이용 동의 (필수)
            </TermsItem>
          </TermsDetailBox>
        )}

        <JoinButton onClick={handleSubmit}>회원가입</JoinButton>
      </JoinBox>
    </Wrapper>
  );
}
