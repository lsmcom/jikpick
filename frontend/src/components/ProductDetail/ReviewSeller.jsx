import styled from 'styled-components';

const ReviewItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  
  border-bottom: 1px solid #eaeaea;
  
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Writer = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Content = styled.p`
  margin: 0;
  line-height: 1.4;
  font-size: 17px;
`;

export default function ReviewSeller({ review }) {
  
  return (
    <ReviewItem>
      <ProfileImage src={review.profile} alt="작성자 프로필" />
      <TextBox>
        <Writer>{review.writer}</Writer>
        <Content>{review.content}</Content>
      </TextBox>
    </ReviewItem>
  );
}
