import { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper, Logo } from '../pages/LoginContainer';
import axios from '../api/axios';

// 스타일 컴포넌트 (수정 없음)
const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 16px;
  padding-right: 32px;
`;

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

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;

  &::placeholder {
    color: #aaa;
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

// 🔐 비밀번호 확인 메세지
const PasswordMessage = styled.div`
  font-size: 16px;
  color: ${({ isMatch }) => (isMatch ? '#2E8B57' : '#FB4A67')};
  margin-top: -10px;
  margin-bottom: 16px;
  padding-left: 4px;
`;

export default function ResetPW() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { id } = location.state || {}; // 🔥 FindPW.jsx에서 넘겨준 userId 받기

  // 비밀번호 재설정 버튼
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.post('/api/users/reset-password', {
        userId: id,
        newPassword,
      });

      if (res.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/login'); // 성공 시 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      alert('비밀번호 변경에 실패했습니다.');
    }

    console.log("전달된 userId:", id);
  };

  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <Box>
        <Title>비밀번호 재설정</Title>
        <InputRow>
          <Input
            placeholder="새 비밀번호"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ✅ 비밀번호 확인 메시지 출력 */}
          {confirmPassword && (
            <PasswordMessage isMatch={newPassword === confirmPassword}>
              {password === confirmPassword
                ? '사용 가능한 비밀번호입니다'
                : '입력한 비밀번호와 다릅니다'}
            </PasswordMessage>
          )}
        </InputRow>
        <MainButton as="button" onClick={handleResetPassword}>
          비밀번호 수정
        </MainButton>
      </Box>
    </Wrapper>
  );
}
