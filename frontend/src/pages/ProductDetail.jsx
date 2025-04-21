import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import ProductDescription from '../components/ProductDetail/ProductDescription';
import SellerProfile from '../components/ProductDetail/SellerProfile';
import ReviewList from '../components/ProductDetail/ReviewList';
import shoes from '../assets/images/shoes.jpg';
import profileImg from '../assets/images/profile1.jpg';
import ReviewTab from '../components/ProductDetail/ReviewTab'; // 



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

const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 0px;
  margin-top: 10px;
  margin-left: 0px;
  
`;



export default function ProductDetail() {
  // ✅ 더미데이터
  const product = {
    id: 1,
    title: '캐논 DIGITAL IXUS 디지털 카메라',
    category: '카메라',
    price: 50000,
    seller: {
      name: '오로라여신',
      rating: 3.0,
      profileImage:profileImg,
    },
    description: '고장났습니다. 수리,정보,복원용품입니다! 보기만해!!예민하신분 구입을 반!품불가용 ㅠㅠ!! 고장났습니다.수리,정보,복원용품입니다! 보기만해!!예민하신분 구입을 반!품불가용 ㅠㅠ!!',
    image: shoes,
    createdAt: '5일 전',
  };

  return (
    <Container>
        <Header/>
      {/* 상단: 이미지 + 상품정보 */}
      <ProductTop>
        <ProductImage src={product.image} alt="상품 이미지" />
        <ProductInfo
          title={product.title}
          category={product.category}
          price={product.price}
          sellerName={product.seller.name}
          createdAt={product.createdAt}
        />
      </ProductTop>

      {/* 설명 */}
      <ProductDescription description={product.description} />

      {/* 판매자 정보 */}
      <SellerProfile seller={product.seller} />

     
     
      <ReviewTab />
      <Footer/>
    </Container>
  );
}
