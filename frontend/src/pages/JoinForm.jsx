import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dropDown2 from '../assets/icon/DropDown2.svg'
import checkIcon from '../assets/icon/checkIcon.svg'
import checkFilledIcon from '../assets/icon/CheckCircleFill.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { Wrapper, Logo } from '../pages/LoginContainer';

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
  const usedIds = ['jikpick123', 'admin', 'user1']; // 예시로 사용 중인 아이디 목록

  // ✅ 비밀번호 상태 정의
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // ✅ 이메일 상태 정의
  const [email, setEmail] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState(null);
  const fakeSentCode = '123456'; //예시로 사용중인 이메일 인증 코드

  // ✅ 닉네임 상태 정의
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(null);
  const usedNicknames = ['오로라마켓', '직픽마스터', 'testuser']; // 예시 닉네임들

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
  
  // ✅ 아이디 중복확인 버튼 클릭 시 처리
  const handleCheckId = () => {
    if (id.trim() === '') return;
    const isAvailable = !usedIds.includes(id.trim().toLowerCase());
    setIdValid(isAvailable);
  };

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

  // ✅ 닉네임 중복확인 버튼 클릭 시 처리
  const handleCheckNickname = () => {
    if (nickname.trim() === '') return;
    const isAvailable = !usedNicknames.includes(nickname.trim());
    setNicknameValid(isAvailable);
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
  const handleSubmit = () => {
    if (!id || idValid === false) return alert('아이디를 확인해주세요.');
    if (!password || password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');
    if (!email || codeValid !== true) return alert('이메일 인증을 완료해주세요.');
    if (!nickname || nicknameValid === false) return alert('닉네임을 확인해주세요.');
    if (!carrier || !phone || phoneCodeValid !== true) return alert('전화번호 인증을 완료해주세요.');
    if (!birth || !birthValid) return alert('생년월일 6자리를 정확히 입력해주세요.');
    if (!gender || !nationality) return alert('성별 및 내외국인을 선택해주세요.');
    if (!agreements.terms || !agreements.privacy || !agreements.location) return alert('약관에 모두 동의해주세요.');

    alert('회원가입이 완료되었습니다.');
    navigate('/login');
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
        <Input placeholder="이름" />

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
