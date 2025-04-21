// src/components/ProductDetail/ProductDescription.jsx
import styled from 'styled-components';

const DescriptionWrapper = styled.div`
  white-space: pre-wrap; /* 줄바꿈 유지 */
  line-height: 1.6;
  font-size: 20px;
  /* margin-bottom: 0px auto 0px auto; */
  margin:20px auto 20px auto;
  width: 1200px;
  padding: 10px;
`;

export default function ProductDescription({ description }) {
  return <DescriptionWrapper>{description}</DescriptionWrapper>;
}
