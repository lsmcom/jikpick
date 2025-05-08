import styled from 'styled-components';
import Footer from '../components/Footer';
import PaymentModal from '../components/PaymentModal';
import closeXIcon from '../assets/icon/CloseXIcon.svg';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

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
  padding: 18px 0;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding-bottom: 34px;
`;

const Section = styled.section`
  margin-top: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const FlexRow = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
`;
const CircleRadio = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 50px; 
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid ${({ checked }) => (checked ? '#FB4A67' : '#ccc')};
  background-color: ${({ checked }) => (checked ? '#FB4A67' : '#fff')};
  color: ${({ checked }) => (checked ? '#fff' : '#333')};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;


const CircleInput = styled.input`
display: none;
`;

const RoundCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

  &:checked {
    background-color: #FB4A67;
    border-color: #FB4A67;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 50%;
    width: 4px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const InfoBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 30px 32px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 18px;
  min-width: 100px;
  white-space: nowrap;
`;

const Select = styled.select`
  flex: 1;
  height: 44px;
  padding: 0 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const MapButton = styled.button`
  padding: 10px 14px;
  background: #FB4A67;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
`;

const RequestTextarea = styled.textarea`
  width: 97%;
  height: 40px;
  padding: 16px;
  font-size: 16px;
  font-family: 'pretendard';
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
  color: #333;
  &::placeholder {
    color: #aaa;
  }
`;

const GuideText = styled.div`
  font-size: 16px;
  color: #777;
  margin-top: 16px;
  line-height: 1.5;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0 40px;
  border-bottom: 1px solid #eee;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  background: #ddd;
  border-radius: 8px;
  background-size: 'cover';
  background-position: 'center';
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 12px;
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-top: 20px;
`;

const MethodButton = styled.button`
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-weight: 500;
`;

const AmountBox = styled.div`
  margin-top: 40px;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 40px;
  background-color: #fff;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 10px;
`;

const BoldRow = styled(Row)`
  font-weight: bold;
`;

const AgreementBox = styled.div`
  margin-top: 40px;
  font-size: 16px;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const BottomButton = styled.button`
  margin: 60px auto 60px;
  display: block;
  width: 100%;
  padding: 16px;
  background-color: #FB4A67;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 32px 0 40px;
`;



export default function ProductOrder() {
    const [pickupOption, setPickupOption] = useState('yes');
    const [selectedBranch, setSelectedBranch] = useState('');
    const allowedRegions = ['마포구', '서대문구', '서초구'];
    const [showMap, setShowMap] = useState(false);
    const [paymentType, setPaymentType] = useState('toss');
    const [rememberPayment, setRememberPayment] = useState(false);
    
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeThirdParty, setAgreeThirdParty] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [filteredStores, setFilteredStores] = useState([]);
    const { itemNo } = useParams();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImage, setProductImage] = useState('');
    const [selectedGeneralMethod, setSelectedGeneralMethod] = useState('');
    const [requestNote, setRequestNote] = useState('');
    const [storeList, setStoreList] = useState([]);
    const navigate = useNavigate();
    const unloadHandlerRef = useRef(null);
    const popstateHandlerRef = useRef(null);
    const [orderCompleted, setOrderCompleted] = useState(false);
    const orderCompletedRef = useRef(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMethod, setModalMethod] = useState('');

    useEffect(() => {
      axios.get(`/api/items/${itemNo}/stores`)
        .then((res) => {
          setFilteredStores(res.data); // storeName, storeAddress 등 포함
          setStoreList(res.data);
        })
        .catch(err => console.error('지점 로딩 실패:', err));
    }, [itemNo]);

    useEffect(() => {
      if (!itemNo) return;
    
      axios.get(`/api/items/${itemNo}`)
        .then(res => {
          const data = res.data;
          setProductName(data.itemName);
          setProductPrice(data.itemCost);
          setProductImage(`/images/${data.imagePaths[0]}`);
        })
        .catch(err => {
          console.error('상품 정보 불러오기 실패:', err);
        });
    }, [itemNo]);

    const cancelReservation = () => {
      axios.put(`/api/items/${itemNo}/cancel-reserve`)
        .then(() => console.log("🟡 상태 복구: 판매중"))
        .catch((err) => console.error("❌ 상태 복구 실패", err));
    };

    // 상품 예약 상태로 변경
    useEffect(() => {
      if (!itemNo) return;
      axios.put(`/api/items/${itemNo}/reserve`)
        .then(() => console.log("상품 예약 상태로 전환됨"))
        .catch(err => console.error("예약 상태 전환 실패", err));
    }, [itemNo]);

    // 👇 useEffect 안 조건문 추가
    useEffect(() => {
      if (!itemNo || orderCompleted) return; // ✅ 결제 완료 시 이탈 감지 등록 X

      unloadHandlerRef.current = (e) => {
        cancelReservation();
        e.preventDefault();
        e.returnValue = '';
      };

      popstateHandlerRef.current = () => {
        cancelReservation();
      };

      window.addEventListener('beforeunload', unloadHandlerRef.current);
      window.addEventListener('popstate', popstateHandlerRef.current);

      return () => {
        window.removeEventListener('beforeunload', unloadHandlerRef.current);
        window.removeEventListener('popstate', popstateHandlerRef.current);
      };
    }, [itemNo, orderCompleted]); // ✅ orderCompleted도 의존성에 추가

    useEffect(() => {
        if (agreeTerms && agreePrivacy && agreeThirdParty) {
          setAgreeAll(true);
        } else {
          setAgreeAll(false);
        }
      }, [agreeTerms, agreePrivacy, agreeThirdParty]);
      
    const handleAgreeAllChange = (checked) => {
      setAgreeAll(checked);
      setAgreeTerms(checked);
      setAgreePrivacy(checked);
      setAgreeThirdParty(checked);
    };
      
    useEffect(() => {
      const filteredByRegion = storeList.filter(store =>
        allowedRegions.some(region => store.storeAddress.includes(region))
      );
    
      const regions = [...new Set(filteredByRegion.map(s => s.regionName))];
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    
      const regionStores = filteredByRegion.filter(s => s.regionName === randomRegion);
      const shuffled = regionStores.sort(() => 0.5 - Math.random());
      setSelectedRegion(randomRegion);
      setFilteredStores(shuffled.slice(0, 3));
    }, [storeList]);
  
    const fee = Math.round(productPrice * 0.02);
    const total = productPrice + fee;

    const handleOrderSubmit = () => {
      const method = paymentType === 'general' ? selectedGeneralMethod : 'TossPay';
      setModalMethod(method);
      setShowModal(true); // 👉 모달 먼저 띄움
    };

    const handleModalConfirm = () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const userNo = user?.userNo;
      const selectedStore = filteredStores.find(s => s.storeNo === parseInt(selectedBranch));
      const storeNo = selectedStore?.storeNo;
    
      const today = new Date();
      const pickExpiryDate = new Date();
      pickExpiryDate.setDate(today.getDate() + 7);
      const formattedExpiry = pickExpiryDate.toISOString().split('T')[0];
    
      const orderData = {
        userNo: parseInt(userNo),
        itemNo: parseInt(itemNo),
        paymentType,
        paymentDetail: paymentType === 'general' ? selectedGeneralMethod : null,
        isPickup: pickupOption === 'yes',
        requestNote,
        isAgreedAll: agreeAll,
        pickExpiryDate: formattedExpiry,
        pickStatus: '거래완료'
      };
    
      if (pickupOption === 'yes') {
        orderData.storeNo = storeNo;
      }
    
      axios.post('/api/orders', orderData)
        .then(() => {
          setOrderCompleted(true);
          axios.put(`/api/items/${itemNo}/complete`);
          navigate('/order/success');
        })
        .catch(err => {
          console.error('주문 실패', err);
          axios.put(`/api/items/${itemNo}/cancel-reserve`);
          alert('결제에 실패했습니다.');
        });
    };

    useEffect(() => {
      return () => {
        if (!orderCompletedRef.current) {
          cancelReservation();
        }
      };
    }, []);

    const selectedStore = filteredStores.find(s => s.storeNo === parseInt(selectedBranch));
    const selectedAddress = selectedStore?.storeAddress || '강남역';

    return (
      <Wrapper>
        <Outer>
          <Inner>
            <TitleBox>
              <Title>구매하기</Title>
            </TitleBox>
  
            <Section>
              <SectionTitle>직픽거래 (직접픽업)</SectionTitle>
              <FlexRow>
                <CircleRadio checked={pickupOption === 'yes'}>
                  <CircleInput
                    type="radio"
                    value="yes"
                    checked={pickupOption === 'yes'}
                    onChange={() => setPickupOption('yes')}
                  />
                  가능
                </CircleRadio>
                <CircleRadio checked={pickupOption === 'no'}>
                  <CircleInput
                    type="radio"
                    value="no"
                    checked={pickupOption === 'no'}
                    onChange={() => setPickupOption('no')}
                  />
                  불가
                </CircleRadio>
              </FlexRow>
              {pickupOption === 'yes' && (
                    <>
                        <InfoBox>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                            <Label style={{ marginRight: '16px' }}>직픽지점</Label>
                            <Select
                              value={selectedBranch}
                              onChange={(e) => setSelectedBranch(e.target.value)}
                            >
                              <option value="">지점 선택</option>
                              {filteredStores.map((store) => (
                                <option key={store.storeNo} value={store.storeNo}>
                                  {store.storeName}
                                </option>
                              ))}
                            </Select>
                            <MapButton onClick={() => setShowMap(true)} style={{ marginLeft: '12px' }}>
                            지도보기
                            </MapButton>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                            <Label style={{ marginRight: '18px' }}>거래 유효시간</Label>
                            <div style={{ fontSize: '18px' }}>7일</div>
                        </div>
                        </InfoBox>

                        <GuideText style={{ marginTop: '12px' }}>
                        • 판매자가 선택한 지점에서 직픽 거래를 진행합니다.<br />
                        • 거래 유효시간 이내 구매자가 거래 요청을 할 수 있습니다.
                        </GuideText>
                    </>
                    )}

                    {/* ✅ 이 아래 두 줄은 조건문 밖으로 — 항상 표시됨 */}
                    <Label style={{ display: 'block', marginTop: '28px', marginBottom: '12px' }}>
                    판매자분께 전달할 요청 사항을 적어주세요
                    </Label>
                    <RequestTextarea
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      placeholder="예) 포장 꼼꼼하게 부탁드려요"
                    />
                    
            </Section>
            <Section>
              <Divider />
              <SectionTitle>주문 상품</SectionTitle>
              <ItemBox>
                <Thumbnail src={productImage} />
                <ItemInfo>
                  <Price>{productPrice.toLocaleString()}원</Price>
                  <div>{productName}</div>
                </ItemInfo>
              </ItemBox>
            </Section>
  
            <Section>
            <SectionTitle>결제수단</SectionTitle>
            <FlexRow>
                <CircleRadio checked={paymentType === 'toss'}>
                <CircleInput
                    type="radio"
                    value="toss"
                    checked={paymentType === 'toss'}
                    onChange={() => setPaymentType('toss')}
                />
                Toss Pay
                </CircleRadio>
                <CircleRadio checked={paymentType === 'general'}>
                <CircleInput
                    type="radio"
                    value="general"
                    checked={paymentType === 'general'}
                    onChange={() => setPaymentType('general')}
                />
                일반결제
                </CircleRadio>
            </FlexRow>


        

            {/* 일반결제용 버튼 */}
            {paymentType === 'general' && (
                <PaymentMethods>
                {[
                    "네이버페이",
                    "체크카드",
                    "카카오페이",
                    "휴대폰결제",
                    "무통장 (가상계좌)",
                    "편의점 결제",
                ].map((method) => (
                    <MethodButton
                      key={method}
                      onClick={() => {
                        setSelectedGeneralMethod(method);
                      }}
                      style={{
                        borderColor: selectedGeneralMethod === method ? '#FB4A67' : '#ccc',
                        backgroundColor: selectedGeneralMethod === method ? '#FB4A67' : '#fff',
                        color: selectedGeneralMethod === method ? '#fff' : '#000',
                      }}
                    >
                    {method}
                    </MethodButton>
                ))}
                </PaymentMethods>
            )}

            {/* TossPay 가결제 버튼 */}
            {paymentType === 'toss' && (
            <div style={{ marginTop: '16px' }}>
                <button
                style={{
                    padding: '20px 70px',
                    backgroundColor: selectedGeneralMethod === 'TossPay' ? '#FB4A67' : 'transparent', // 배경 제거
                    color: selectedGeneralMethod === 'TossPay' ? '#fff' : '#000000',               // 텍스트 컬러 메인색
                    fontSize: '15px',
                    border: '1px solid',   // 테두리만
                    borderColor: selectedGeneralMethod === 'TossPay' ? '#FB4A67' : '#ccc',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 600
                }}
                onClick={() => {
                  setSelectedGeneralMethod('TossPay'); 
                }}
                >
                TossPay
                </button>
            </div>
            )}

            {showModal && (
              <PaymentModal
                method={modalMethod}
                onClose={() => setShowModal(false)}
                onConfirm={handleModalConfirm}
                icon={closeXIcon}
              />
            )}

            </Section> 

            <div style={{
            background: '#f3f3f3',
            borderRadius: '12px',
            padding: '20px',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#555',
            alignItems: 'flex-start',
            lineHeight: '1.5',

            }}>
            <div>
                <strong style={{ display: 'block', marginBottom: '8px', fontSize: '16px' }}>이용 안내</strong>
                <div style={{ color: '#888', fontSize: '16px' }}>
                • 현금영수증은 네이버페이에서 발급 가능
                </div>
            </div>
            <div style={{ color: '#888', fontSize: '14px', cursor: 'pointer' }}>전체보기 &gt;</div>
            </div>

            <div style={{ marginTop: '16px', fontSize: '16px', color: '#333' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '50px' }}>
                <RoundCheckbox
                checked={rememberPayment}
                onChange={(e) => setRememberPayment(e.target.checked)}
                />
                이 결제수단을 다음에도 사용
            </label>
            </div>
            <SectionTitle>결제 금액</SectionTitle>
            <AmountBox>
                <Row>
                    <div>상품금액</div>
                    <div>{productPrice.toLocaleString()}원</div>
                </Row>
                <Row>
                    <div>직픽 수수료 (2%)</div>
                    <div>{fee.toLocaleString()}원</div>
                </Row>

                {/* 구분선 추가 */}
                <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

                <BoldRow>
                    <div>총 결제금액</div>
                    <div>{total.toLocaleString()}원</div>
                </BoldRow>
                </AmountBox>


                <AgreementBox>
                {/* ✅ 전체 동의 체크박스 */}
                <CheckboxRow>
                <RoundCheckbox
                    checked={agreeAll}
                    onChange={(e) => handleAgreeAllChange(e.target.checked)}
                />
                <span style={{ fontWeight: '700', fontSize: '18px' }}>아래 내용에 전체 동의해요.</span>
                </CheckboxRow>


                {/* ✅ 개별 동의 항목 */}
                <CheckboxRow>
                    <RoundCheckbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    직픽 서비스 이용약관 동의 (필수)
                </CheckboxRow>
                <CheckboxRow>
                    <RoundCheckbox
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    />
                    개인정보 수집 및 이용 동의 (필수)
                </CheckboxRow>
                <CheckboxRow>
                    <RoundCheckbox
                    checked={agreeThirdParty}
                    onChange={(e) => setAgreeThirdParty(e.target.checked)}
                    />
                    개인정보 제3자 제공 동의 (필수)
                </CheckboxRow>

                <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6 }}>
                직픽㈜은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 전자상거래 등에서의 소비자보호에 관한 법률 등 관련
                법령 및 직픽㈜의 약관에 따라 상품, 상품정보, 거래에 관한 책임은 개별 판매자에게 귀속하고, 직픽㈜는은원칙적으
                로 회원간 거래에 대하여 책임을 지지 않습니다. 다만, 직픽㈜가 직접 판매하는 상품에 대한 책임은 직픽㈜에게 
                귀속합니다.
                </p>
                </AgreementBox>

                
                <BottomButton onClick={handleOrderSubmit}>
                  {total.toLocaleString()}원 결제하기
                </BottomButton>
                

          </Inner>
        </Outer>
  
        {showMap && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999
          }}>
            <div style={{
              width: '80%',
              height: '500px',
              background: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <button onClick={() => setShowMap(false)} style={{
                position: 'absolute',
                top: 16, right: 20,
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}>×</button>
              <iframe
                title="kakao-map"
                src={`https://map.kakao.com/?q=${encodeURIComponent(selectedAddress)}`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        )}
  
        <Footer />
      </Wrapper>
    );
  }