import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 40px 24px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 32px;
`;

export default function ProductRegistration() {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Title>상품등록</Title>
        {/* 나머지 폼 요소들 작성 예정 */}
      </Container>
      <Footer />
    </Wrapper>
  );
}