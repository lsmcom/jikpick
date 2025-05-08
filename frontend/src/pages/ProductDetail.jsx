import styled from 'styled-components';
import Footer from '../components/Footer';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import ProductDescription from '../components/ProductDetail/ProductDescription';
import SellerProfile from '../components/ProductDetail/SellerProfile';
import ReviewList from '../components/ProductDetail/ReviewList';
import shoes from '../assets/images/shoes.jpg';
import profileImg from '../assets/images/profile1.jpg';
import ReviewTab from '../components/ProductDetail/ReviewTab';
import soldOut from '../assets/images/Soldout.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DefaultProfile from '../assets/images/DefaultProfile.svg';
import axios from '../api/axios'; 

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  font-family: 'Pretendard', sans-serif;
`;

const ProductTop = styled.div`
  
  width: 1200px;
  display: flex;
  gap: 60px;
  margin: 30px auto 0 auto;
  padding: 10px;
  height: 400px;

`;

const ImageWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px; 
  border-radius: 8px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const SoldOutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
`;

export default function ProductDetail() {

  const { itemNo } = useParams(); // URL에서 /items/:itemNo 값 추출
  const [product, setProduct] = useState(null);
  const [profile, setProfile] = useState('');
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [saleCount, setSaleCount] = useState(0);
  const [reviews, setReviews] = useState([]); // 리뷰 목록을 저장할 state

  // 상품 정보 불러오기
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/api/items/${itemNo}`);
        setProduct(res.data);
      } catch (err) {
        console.error('상품 불러오기 실패:', err);
      }
    };
    fetchItem();
  }, [itemNo]);

  console.log(product);

  // 상품에 대한 리뷰를 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/item/${itemNo}`);
        setReviews(res.data); // 리뷰 목록을 상태에 저장
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err);
      }
    };
    fetchReviews();
  }, [itemNo]);

  // 판매자 정보 및 이미지 불러오기
  useEffect(() => {
    const loadProfile = async() => {
      try {
        const memberId = JSON.parse(sessionStorage.getItem('user')).id; // memberId 불러오기
        const userInfo = await axios.get('/api/users/me', {
          params: { userId: memberId }
        });
        
        const imgUrl = (userInfo.data.image);

        // 해당 정보들을 state로 업데이트
        setProfile(imgUrl || DefaultProfile); // 프로필 이미지
        setNickname(userInfo.data.nickname || '상점명 없음'); // 판매자 별명
        setRating(userInfo.data.rating || 0); // 평점
        setRatingCount(userInfo.data.ratingCount || 0); // 평점 개수
        setSaleCount(userInfo.data.saleCount || 0); // 판매 상품 개수

      } catch (error) {
        console.error('프로필 로드 실패:', error);
      }
    };

    loadProfile();
  }, []);

  // ✅ 로딩 중 처리
  if (!product) return null;

  return (
    <Container>
      {/* 상단: 이미지 + 상품정보 */}
      <ProductTop>
        <ImageWrapper>
          <ProductImage src={`/images/${product.imagePaths[0]}`} alt="상품 이미지" />
            {product.pickStatus === '거래완료' && (
              <SoldOutOverlay>
                <SoldOutImage src={soldOut} alt="판매완료" />
              </SoldOutOverlay>
            )}
        </ImageWrapper>
        <ProductInfo
          title={product.itemName}
          category={product.categoryName}
          price={product.itemCost}
          sellerProfile={profile}
          sellerName={product.sellerNick}
          sellerRating={rating}
          sellerRatingCount={ratingCount}
          createdAt={product.itemDate}
          itemWish={product.itemWish}
          itemStatus={product.itemStatus}
          productId={product.itemNo}
          pickStatus={product.pickStatus}
        />
      </ProductTop>

      {/* 설명 */}
      <ProductDescription description={product.itemInfo} />

      {/* 판매자 정보 */}
      <SellerProfile
        seller={{
          name: product.sellerNick,
          profileImage: profile,
          rating: rating,
          ratingCount: ratingCount,
          saleCount: saleCount
        }}
      />
     
      <ReviewTab reviews={reviews}/> {/* 리뷰 목록을 ReviewList에 전달 */}
      <Footer/>
    </Container>
  );
}
