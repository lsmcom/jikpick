import styled from 'styled-components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Wrapper, Logo } from '../pages/LoginContainer';

const Box = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

const TermItem = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  cursor: pointer;

  .check-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
  }

  input[type='checkbox'] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1.5px solid #999;
    border-radius: 50%;
    position: relative;
  }

  input[type='checkbox']::after {
    content: '✔';
    color: white;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    display: none;
  }

  input[type='checkbox']:checked {
    background-color: #FB4A67;
    border-color: #FB4A67;
  }

  input[type='checkbox']:checked::after {
    display: block;
  }

  small {
    font-size: 16px;
    color: #888;
    padding-left: 26px;
    text-indent: 7px;
  }
`;

const SubmitButton = styled(NavLink)`
  display: block;
  text-align: center;
  width: 100%;
  background-color: #FB4A67;
  color: white !important; /* ✅ 강제 적용 */
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
`;

const StyledNav = styled(NavLink)`
  width: 100%;
  text-decoration: none;
`;

export default function JoinAgree() {
  const terms = [
    { label: '[필수] 직픽 이용약관', desc: '각 항목 설명들을 전체 동의합니다.' },
    { label: '[필수] 개인정보 수집 및 이용', desc: '각 항목 설명들을 전체 동의합니다.' },
    { label: '[필수] 실명 인증 동의', desc: '각 항목 설명들을 전체 동의합니다.' },
    { label: '[필수] 위치기반서비스 이용약관', desc: '각 항목 설명들을 전체 동의합니다.' },
    { label: '[선택] 개인정보 수집 및 이용', desc: '이벤트·혜택 정보 수신' },
  ];

  const [checkedList, setCheckedList] = useState(Array(terms.length).fill(false));
  const [allChecked, setAllChecked] = useState(false);

  const handleAllCheck = () => {
    const nextState = !allChecked;
    setAllChecked(nextState);
    setCheckedList(Array(terms.length).fill(nextState));
  };

  const handleSingleCheck = (index) => {
    const nextList = [...checkedList];
    nextList[index] = !nextList[index];
    setCheckedList(nextList);
    setAllChecked(nextList.every(Boolean)); // 모두 체크됐는지 확인
  };

  const requiredCount = terms.filter(term => term.label.startsWith('[필수]')).length;
  const isRequiredChecked = checkedList.slice(0, requiredCount).every(Boolean);

  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <Box>
        <Title>회원가입</Title>

        {/* 전체 동의 */}
        <TermItem>
          <div className="check-row">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheck}
            />
            전체 동의하기
          </div>
          <small>각 항목 설명들을 전체 동의합니다.</small>
        </TermItem>

        {/* 개별 항목 */}
        {terms.map((term, index) => (
          <TermItem key={index}>
            <div className="check-row">
              <input
                type="checkbox"
                checked={checkedList[index]}
                onChange={() => handleSingleCheck(index)}
              />
              {term.label}
            </div>
            <small>{term.desc}</small>
          </TermItem>
        ))}
        <SubmitButton
          to={isRequiredChecked ? "/join" : "#"}
          onClick={(e) => {
            if (!isRequiredChecked) {
              e.preventDefault();
              alert('모든 필수 약관에 동의해야 다음 단계로 이동할 수 있습니다.');
            }
          }}
        >
          다음
        </SubmitButton>



      </Box>
    </Wrapper>
  );
}
