import styled from 'styled-components';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import frameIcon from '../assets/icon/CheckCircleFill.svg';
import axios from '../api/axios';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inner = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 100px 20px 120px; // ⬇️ 상단 여백 늘림
  text-align: center;
`;
const CheckCircle = styled.div`
  width: 120px;
  height: 120px;
  background-color: #fff; // 배경을 흰색으로
  border: 5px solid #FB4A67;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 50px;
`;

const Icon = styled.img`
  width: 150px;
  height: 150px;
`;

const AmountText = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin-top: 60px; // ⬇️ 더 아래로
  margin-bottom: 12px;
`;

const PlaceText = styled.p`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Guide = styled.p`
  font-size: 15px;
  color: #777;
  margin-bottom: 50px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  max-width: 600px;
  background: #FB4A67;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  padding: 16px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userNo = user?.userNo;

    if (!userNo) return;
  
    axios.get(`/api/orders/latest?userNo=${userNo}`)
      .then(res => {
        if (res.status === 204) {
          console.log('최근 주문 없음');
          return;
        }
        setOrder(res.data);
      })
      .catch(err => {
        console.error('주문 정보 불러오기 실패', err);
      });
  }, []);

  return (
    <Wrapper>
      <Inner>
        <CheckCircle>
          <Icon src={frameIcon} alt="완료 아이콘" />
        </CheckCircle>
        <AmountText>
          {order ? `${order.itemCost.toLocaleString()}원 결제가 완료되었습니다` : '결제 완료'}
        </AmountText>
        <PlaceText>
          {order?.storeName
            ? `‘${order.storeName}’ 에서 해당 상품을 직접 픽업해주세요!`
            : '직픽 없이 배송되는 상품입니다.'}
        </PlaceText>
        <Guide>
          픽업 거래가 완료될 때까지 판매자에게 돈이 전달되지 않으니 걱정마세요
        </Guide>
        <ConfirmButton onClick={() => navigate('/shopOrder')}>
          주문상세내역 확인
        </ConfirmButton>
      </Inner>
      <Footer />
    </Wrapper>
  );
}
