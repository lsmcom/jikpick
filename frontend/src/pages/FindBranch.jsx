import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Map from '../components/Map';
import Footer from '../components/Footer';
import { RegionList } from '../assets/RegionList';
import searchIcon from '../assets/icon/SearchIcon.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

// 내부 콘텐츠를 감싸는 외부 wrapper (좌우 여백 포함)
const Outer = styled.div`
    width: 100%;

`;

// 콘텐츠 최대 너비 제한 및 중앙 정렬을 위한 wrapper
const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto; // 수평 중앙 정렬
`;

const PageTitle = styled.span`
    font-size: 30px;
    font-weight: bold;
    margin: 30px 0;
`;

const FilterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #FAFAFA;
    border: 1px solid #C0C0C0;
    border-radius: 20px;
    padding: 35px 0px;
    margin-bottom: 32px;
    gap: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const FilterRow = styled.div`
    display: flex;
    width: 80%;
    gap: 12px;
`;

const RowTitle = styled.span`
    display: flex;
    height: 40px;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    margin-right: 20px;
`;

const Select = styled.select`
    padding: 0 12px;
    border: 1px solid #C0C0C0;
    border-radius: 15px;
    font-size: 18px;
    width: 200px;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #C0C0C0;
    border-radius: 15px;
    width: 350px;
    padding: 0 12px;
    transition: box-shadow 0.2s;

    &:focus-within {
        box-shadow: inset 0 0 0 2px #FB4A67; 
        border: none;
    }
`;

const SearchInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    font-size: 18px;
    outline: none;
`;

const SearchIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:hover {
        filter: brightness(0) saturate(100%) invert(33%) sepia(79%) saturate(2748%) hue-rotate(330deg) brightness(95%) contrast(101%);
    }
`;

const RadioGroup = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const TimeChoiceBtn = styled.button`
    display: flex;
    height: 40px;
    padding: 8px 16px;
    border-radius: 15px;
    border: 1px solid ${({ selected }) => (selected ? '#fb4a67' : '#ccc')};
    background-color: ${({ selected }) => (selected ? '#fb4a67' : '#fff')};
    color: ${({ selected }) => (selected ? '#fff' : '#333')};
    cursor: pointer;
    align-items: center;
    font-size: 18px;
`;

const CheckBtn = styled.button`
    width: 100px;
    background-color: #fb4a67;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
    height: 800px;
    gap: 32px;
`;

const BranchCount = styled.span`
    font-size: 28px;
    font-weight: bold;
`;

const BranchWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 20px;
    padding: 0px 40px;
`;

const BranchContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto; //고정 높이 초과 시 스크롤 생성
`;

const BranchItem = styled.div`
    border-bottom: 1px solid #ddd;
    padding: 16px 0;
    cursor: pointer;
`;

const MapBox = styled.div`
    flex: 1;
    min-height: 400px;
    margin-top: 20px;
`;

const BranchName = styled.div`
    font-weight: bold;
    font-size: 20px;
`;

const BranchInfo = styled.div`
    font-size: 18px;
    margin-top: 6px;
`;

export default function FindBranch() {
    const BranchList = [
        {
            id: 1,
            name: "샘플점 1",
            number: "02-123-1234",
            hours: "10:00 - 22:00",
            roadAddress: "서울특별시 강서구 양천로63길 8",
            lotAddress: "서울특별시 강서구 염창동 241-11",
        },
        {
            id: 2,
            name: "샘플점 2",
            number: "02-123-1234",
            hours: "10:00 - 22:00",
            roadAddress: "서울특별시 강서구 양천로63길 12",
            lotAddress: "서울특별시 강서구 염창동 241-9 준명빌딩",
        },
        {
            id: 3,
            name: "샘플점 3",
            number: "02-123-1234",
            hours: "10:00 - 22:00",
            roadAddress: "서울특별시 강남구 강남대로100길 10",
            lotAddress: "서울특별시 강남구 역삼동 619-15",
        },
        {
            id: 4,
            name: "샘플점 4",
            number: "02-123-1234",
            hours: "10:00 - 22:00",
            roadAddress: "서울특별시 강남구 강남대로100길 13",
            lotAddress: "서울특별시 강남구 역삼동 619-5",
        },
        {
            id: 5,
            name: "샘플점 5",
            number: "02-123-1234",
            hours: "24시간",
            roadAddress: "서울특별시 강남구 강남대로100길 13-5",
            lotAddress: "서울특별시 강남구 역삼동 619-6",
        },
        {
            id: 6,
            name: "샘플점 6",
            number: "02-123-1234",
            hours: "24시간",
            roadAddress: "서울특별시 강남구 강남대로100길 13-7",
            lotAddress: "서울특별시 강남구 역삼동 619-7",
        },
        {
            id: 7,
            name: "샘플점 7",
            number: "02-123-1234",
            hours: "24시간",
            roadAddress: "서울특별시 강서구 양천로63길 16",
            lotAddress: "서울특별시 강서구 염창동 241-33",
        },
        {
            id: 8,
            name: "샘플점 8",
            number: "02-123-1234",
            hours: "24시간",
            roadAddress: "서울특별시 강서구 양천로63길 27",
            lotAddress: "서울특별시 강서구 염창동 240-27",
        },
    ];

    const [region, setRegion] = useState('');
    const [subRegion, setSubRegion] = useState('');
    const [subRegions, setSubRegions] = useState([]);
    const [search, setSearch] = useState('');
    const [hours, setHours] = useState('전체');
    const [branchList, setBranchList] = useState(BranchList);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const FilterBranch = () => {        
        const filteredBranches = BranchList.filter((branch) => {
            const matchesRegion = region ? branch.lotAddress.includes(region) : true;
            const matchesSubRegion = subRegion ? branch.lotAddress.includes(subRegion) : true;
            const matchesSearch = search.trim() ? branch.name.includes(search.trim()) : true;
            const matchesHours = hours && hours !== '전체' ? branch.hours === hours : true;
    
            return matchesRegion && matchesSubRegion && matchesSearch && matchesHours;
        });
    
        setBranchList(filteredBranches);
    }

    useEffect(() => {
        // 선택된 지역에 따라 하위 지역 목록을 가져옴
        const selectedRegion = RegionList.find((r) => r.name === region);
        setSubRegions(selectedRegion ? selectedRegion.subRegion : []);
    }, [region]);

    const handleBranchClick = (roadAddress) => {
        setSelectedAddress(roadAddress);
    };

    return (
        <Wrapper>
            <Outer>
                <Inner>
                    <PageTitle>직픽 지점별 위치를 안내드립니다.</PageTitle>
                    <FilterBox>
                        <FilterRow>
                            <RowTitle>지역선택</RowTitle>
                            <Select value={region} onChange={(e) => setRegion(e.target.value)}>
                                <option value="" disabled hidden={region !== ''}>광역시/도</option>
                                {RegionList.map((r, index) => (
                                    <option key={index}>{r.name}</option>
                                ))}
                            </Select>
                            <Select value={subRegion} onChange={(e) => setSubRegion(e.target.value)}>
                                <option value="" disabled hidden={subRegion !== ''}>시/군/구</option>
                                {subRegions.map((sub) => (
                                    <option>{sub}</option>
                                ))}
                            </Select>
                            <SearchBar>
                                <SearchInput
                                    type="text"
                                    placeholder="지점명 입력"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <SearchIcon src={searchIcon}/>
                            </SearchBar>
                        </FilterRow>
                        <FilterRow>
                            <RowTitle>영업시간</RowTitle>
                            <RadioGroup>
                                {['전체', '10:00 - 22:00', '24시간'].map((label) => (
                                    <TimeChoiceBtn
                                        key={label}
                                        selected={hours === label}
                                        onClick={() => setHours(label)}
                                    >
                                        {label}
                                    </TimeChoiceBtn>
                                ))}
                            </RadioGroup>
                        </FilterRow>
                        <CheckBtn onClick={() => FilterBranch()}>조회</CheckBtn>
                    </FilterBox>
                    <ContentWrapper>
                        <BranchWrapper>
                            <BranchCount>지점({branchList.length})</BranchCount>
                            <BranchContainer>
                                {branchList.map((branch, key) => (
                                    <BranchItem onClick={() => handleBranchClick(branch.roadAddress)} key={key}>
                                        <BranchName>{branch.name}</BranchName>
                                        <BranchInfo>{branch.number} | 영업시간: {branch.hours}</BranchInfo><br/>
                                        <BranchInfo>도로명 {branch.roadAddress}</BranchInfo>
                                        <BranchInfo>지번 {branch.lotAddress}</BranchInfo>
                                    </BranchItem>
                                ))}
                            </BranchContainer>
                        </BranchWrapper>
                        <MapBox>
                            <Map
                                selectedAddress={selectedAddress}
                                roadAddressList={BranchList.map((branch) => branch.roadAddress)}
                            />
                        </MapBox>
                    </ContentWrapper>
                </Inner>
            </Outer>
            <Footer />
        </Wrapper>
    );
}