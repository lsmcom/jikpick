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

  // ✅ 로딩 중 처리
  if (!product) return null;

  return (
    <Container>
      {/* 상단: 이미지 + 상품정보 */}
      <ProductTop>
      <ImageWrapper>
        <ProductImage src={`http://localhost:9090/images/${product.itemImage}`} alt="상품 이미지" />
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
          sellerName={product.sellerNick}
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
      <SellerProfile seller={{ name: product.sellerNick, profileImage: profileImg }} />
     
      <ReviewTab />
      <Footer/>
    </Container>
  );
}
