import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import check from '../assets/icon/Check.svg';
import addFile from '../assets/icon/PlusCircle.svg';
import camera from '../assets/icon/CameraIcon.svg';
import emoticon from '../assets/icon/emoticon.svg';
import send from '../assets/icon/Send.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Outer = styled.div`
    width: 100%;
`;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
`;

const TitleBox = styled.div`
    display: flex;
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    padding: 20px 0;
`;

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    height: 1000px;
`;

const ChatListSection = styled.div`
    flex: 1;
    background-color: #f8f8f8;
    overflow-y: auto;
`;

const ChatDetailSection = styled.div`
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

const ChatListHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`;

const Expander = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 8px;
    cursor: pointer;
`;

const ChatListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? '#eee' : 'transparent')};

    &:hover {
        background-color: #f0f0f0;
    }
`;

const UserInfo = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    gap: 12px;
`;

const UserProfile = styled.img`
    width: 60px;
    height: 60px;
    background-color: #ddd;
    border-radius: 50%;
`;

const ChatInfo = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const UserName = styled.span`
    font-weight: bold;
    font-size: 20px;
`;

const LastMessage = styled.span`
    width: 100%;
    text-overflow: ellipsis; // 위에 설정한 너비보다 길면 말줄임표처럼 표시
    white-space: nowrap; // 줄바꿈 안함
    display: block; // ie6이상 현재요소를 블럭처리
    font-size: 18px;
    overflow: hidden;
`;

const Notification = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fb4a67;
    color: #fff;
    visibility: ${({ unreadMessages }) => (unreadMessages > 0 ? 'visible' : 'hidden')};
    border-radius: 50%;
`;

const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    border-bottom: 1px solid #e5e5e5;
`;

const ChatProductInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const ProductImage = styled.img`
    width: 60px;
    height: 60px;
    background-color: #ddd;
    border-radius: 8px;
`;

const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.div`
    color: #6E6E6E;
    font-size: 20px;
`;

const ProductPrice = styled.div`
    font-weight: bold;
    font-size: 20px;
`;

const SellerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`;

const SellerProfile = styled.img`
    width: 90px;
    height: 90px;
    background-color: #ddd;
    border-radius: 50%;
`;

const SellerName = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin-top: 16px;
`;

const SellerRating = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #626262;
    margin-top: 4px;
`;

const Star = styled.span`
    color: #fb4a67;
`;

const ChatMessages = styled.div`
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MessageBubble = styled.div`
    max-width: 60%;
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 16px;
    align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
    background-color: ${({ isMine }) => (isMine ? '#fb4a67' : '#f1f1f1')};
    color: ${({ isMine }) => (isMine ? '#fff' : '#000')};
`;

const ChatInputArea = styled.div`
    background-color: #fafafa;
    border-top: 1px solid #e5e5e5;   
    padding: 10px 15px;
`;

const ChatInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 50px;
`;

const ChatInput = styled.input`
    width: 80%;
    padding: 10px;
    border: none;
    background-color: #f1f1f1;
    font-size: 18px;
    outline: none;
`;

const BtnWrapper = styled.div`
    display: flex;
    margin: 0 5px;
`;

const InputBtn = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 0 8px;
    cursor: pointer;
`;

const EmptyChat = styled.div`
    margin: auto;
    font-weight: bold;
    font-size: 30px;
    font-style: italic;
`;

const EmojiList = styled.div`
    position: absolute;
    bottom: 50px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 200px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const EmojiButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

export default function Chat() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, chatId: 1, sender: 'me', text: '안녕하세요, 거래하고 싶습니다.' },
        { id: 2, chatId: 1, sender: 'other', text: '00000-000000-000 신한' },
        { id: 3, chatId: 1, sender: 'other', text: '여기로 입금해주시면 됩니다.' },
        { id: 4, chatId: 1, sender: 'me', text: '배송은 언제쯤 되나요?' },
        { id: 5, chatId: 1, sender: 'other', text: '입금되는대로 바로 발송할 예정입니다.' },
        { id: 6, chatId: 2, sender: 'me', text: '물건 상태가 궁금합니다.' },
        { id: 7, chatId: 2, sender: 'other', text: '물건은 아주 상태가 좋아요.' },
        { id: 8, chatId: 2, sender: 'me', text: '사진은요?' },
        { id: 9, chatId: 2, sender: 'other', text: '잠시만요.' },
        { id: 10, chatId: 3, sender: 'me', text: '무료 나눔은 가능한가요?' },
        { id: 11, chatId: 3, sender: 'other', text: '안됩니다.' },
        { id: 12, chatId: 3, sender: 'me', text: '그럼 절반 할인은요?' },
        { id: 13, chatId: 3, sender: 'other', text: '차단할게요.' },
        { id: 14, chatId: 4, sender: 'me', text: '아직 판매하나요?' },
        { id: 15, chatId: 4, sender: 'other', text: '네 아직 남아있습니다.' },
        { id: 16, chatId: 4, sender: 'me', text: '구매하고 싶어요!' },
        { id: 17, chatId: 5, sender: 'me', text: '물건 상태를 확인하고 싶어요.' },
        { id: 18, chatId: 5, sender: 'other', text: '지금 밖이라 사진은 나중에 보여드릴 수 있어요' },
        { id: 19, chatId: 5, sender: 'me', text: '알겠습니다.' },
        { id: 20, chatId: 1, sender: 'other', text: '혹시 우체국 택배가 편하실까요? 아니면 편의점 택배로 보내드릴까요?' },
    ]);

    const [chatList, setChatList] = useState([
        { 
            id: 1, 
            name: '참여자 1', 
            lastChecked: 5, // 채팅방에서 마지막 확인한 메시지 ID
            itemName: "오큘러스 퀘스트 2",
            price: 200000
        },
        { 
            id: 2, 
            name: '참여자 2',
            lastChecked: 8, // 마지막으로 확인한 메시지 ID
            itemName: "블루투스 동글",
            price: 10000
        },
        { 
            id: 3, 
            name: '참여자 3',
            lastChecked: 13, // 마지막으로 확인한 메시지 ID
            itemName: "닌텐도 스위치",
            price: 250000
        },
        { 
            id: 4, 
            name: '참여자 4',
            lastChecked: 16, // 마지막으로 확인한 메시지 ID
            itemName: "차박 캠핑용 텐트",
            price: 550000 
        },
        { 
            id: 5, 
            name: '참여자 5',
            lastChecked: 19, // 마지막으로 확인한 메시지 ID
            itemName: "홀릭앤플레이 골프 반팔 튜브 구스 다운 점퍼",
            price: 80000
        }
    ]);

    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const emojis = ['😊', '😂', '😅', '😍', '😢', '😎'];

    const handleSendMessage = () => {
        if (message.trim() === '' || !selectedChat) return;
    
        const newMessage = {
            id: Date.now(),
            chatId: selectedChat,
            sender: 'me', // 내가 보낸 메시지
            text: message.trim(),
        };
    
        // 메시지 추가 후 마지막 확인 메시지 갱신
        const updatedChatList = chatList.map((chat) => 
            chat.id === selectedChat ? { ...chat, lastChecked: newMessage.id } : chat
        );
    
        setMessages((prev) => [...prev, newMessage]);
        setMessage('');
        setChatList(updatedChatList); // 채팅방의 lastChecked 업데이트
        setSelectedChat(selectedChat);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newMessage = {
                id: Date.now(),
                chatId: selectedChat,
                sender: 'me', // 내가 보낸 메시지
                text: `파일: ${file.name}`,
                file: file
            };
            setMessages((prev) => [...prev, newMessage]);
        }
    };

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };

    const handleEmojiClick = (emoji) => {
        setMessage(message + emoji);
        setEmojiPickerVisible(false); // 이모티콘 선택 후 선택창 닫기
    };

    return (
        <Wrapper>
            <Outer>
                <Inner>
                    <TitleBox>직픽톡</TitleBox>
                    <ContentWrapper>
                        <ChatListSection>
                            <ChatListHeader>
                                전체 대화
                                <Expander src={check} onClick={() => {console.log("확장됨!")}} />
                            </ChatListHeader>
                            {chatList.map((chat) => {
                                // 알림의 수 계산
                                const unreadMessages = messages.filter(
                                    (msg) => msg.chatId === chat.id && msg.id > chat.lastChecked
                                ).length;

                                return (
                                    <ChatListItem
                                        key={chat.id}
                                        selected={selectedChat === chat.id}
                                        onClick={() => setSelectedChat(chat.id)}
                                    >
                                        <UserInfo>
                                            <UserProfile src="https://placehold.co/60x60"/>
                                            <ChatInfo>
                                                <UserName>{chat.name}</UserName>
                                                <LastMessage>{messages.filter((msg) => msg.chatId === chat.id).slice(-1)[0]?.text}</LastMessage>
                                            </ChatInfo>
                                        </UserInfo>
                                        <Notification unreadMessages={unreadMessages}>
                                            {unreadMessages}
                                        </Notification>
                                    </ChatListItem>
                                );
                            })}
                        </ChatListSection>
                        <ChatDetailSection>
                            {selectedChat ? (
                                <>
                                    <ChatHeader>
                                        <ChatProductInfo>
                                            <ProductImage src="https://placehold.co/60x60"/>
                                            <ProductDetails>
                                                <ProductName>{chatList[selectedChat-1].itemName}</ProductName>
                                                <ProductPrice>{chatList[selectedChat-1].price.toLocaleString('ko-KR')}원</ProductPrice>
                                            </ProductDetails>
                                        </ChatProductInfo>
                                    </ChatHeader>
                                    <SellerInfo>
                                        <SellerProfile src="https://placehold.co/90x90"/>
                                        <SellerName>오로라마켓</SellerName>
                                        <SellerRating>
                                            3.5
                                            <Star> ★ </Star>
                                            (4)
                                        </SellerRating>
                                    </SellerInfo>
                                    <ChatMessages>
                                    {messages
                                        .filter((msg) => msg.chatId === selectedChat)
                                        .map((msg) => (
                                            <MessageBubble key={msg.id} isMine={msg.sender === 'me'}>
                                                {msg.text}
                                            </MessageBubble>
                                        ))
                                    }
                                    </ChatMessages>
                                    <ChatInputArea>
                                        <ChatInputWrapper>
                                            <BtnWrapper>
                                                <InputBtn src={addFile} onClick={() => document.getElementById('fileInput').click()} />
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />
                                            </BtnWrapper>
                                            <ChatInput
                                                type="text"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="메시지를 입력하세요."
                                            />
                                            <BtnWrapper>
                                                <InputBtn src={emoticon} onClick={toggleEmojiPicker} />
                                                <InputBtn src={send} onClick={handleSendMessage}/>
                                            </BtnWrapper>
                                            {emojiPickerVisible && (
                                                <EmojiList>
                                                    {emojis.map((emoji, index) => (
                                                        <EmojiButton key={index} onClick={() => handleEmojiClick(emoji)}>
                                                            {emoji}
                                                        </EmojiButton>
                                                    ))}
                                                </EmojiList>
                                            )}
                                        </ChatInputWrapper>
                                    </ChatInputArea>
                                </>
                            ) : (
                                <EmptyChat>
                                    대화를 선택해주세요!
                                </EmptyChat>
                            )}
                        </ChatDetailSection>
                    </ContentWrapper>
                </Inner>
            </Outer>
            <Footer />
        </Wrapper>
    );
}
