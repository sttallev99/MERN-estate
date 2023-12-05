import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { BsFillSendFill } from 'react-icons/bs'

import UserChatCard from '../components/chat/UserChatCard'
import Message from '../components/chat/Message';
import { createMessage, getMessages } from '../redux/message/messageSlice';
import { useGetChatsQuery } from '../redux/api/apiSlice'; 
import useConnectAndGetOnlineListings from '../hooks/useConnectAndGetOnlineListings';

export default function Messages() {
  const [text, setText] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);
  const {selectedChat, selectedListing} = useSelector(state => state.chat);
  const messages = useSelector(state => state.message.messages)
  const dispatch = useDispatch();
  const { data: chats } = useGetChatsQuery(currentUser._id);
  
  useConnectAndGetOnlineListings();
  
  useEffect(() => {
    if(selectedChat) {
      dispatch(getMessages(selectedChat._id))
    }
  }, [selectedChat])
  
  const handleButtonClick = () => {
    if(selectedListing, currentUser, text) {
      dispatch(createMessage({chatId: selectedChat._id, senderId: currentUser._id, text}))
    }else {
      console.log('end')
    }
  }

  return (
    <div className='message-box flex justify-center items-center'>
      <div className='w-4/5 h-2/3 p-5 flex bg-white shadow-md'>
        <div className='w-1/4'>
            <p className='flex justify-center items-center font-semibold text-xl h-16'>Chats</p>
            <div className='h-[calc(100%-88px)] overflow-auto'>
                {chats?.map(chat => <UserChatCard chat={chat} user={currentUser} key={chat._id} />)}
            </div>
        </div>
        <div className='w-3/4 px-5'>
            <div className='flex items-center h-16'>
              {
                selectedChat && (
                  <>
                    <img 
                        src={selectedListing?.imageUrls[0]} 
                        alt=""
                        className='w-14 h-14 rounded-full mx-5'
                    />
                    <p className='font-semibold text-xl'>{selectedListing?.name}</p>
                  </>
                )
              }
            </div>
            <div className='bg-slate-100 w-full h-[calc(100%-64px)] rounded-lg mt-2 flex flex-col relative'>
              <div className='overflow-auto h-6/7 px-4'>
                {messages.length > 0 ? messages.map(message => <Message message={message} key={message._id} />) : <p>Start conversation</p>}
              </div>
              <div className='chat-input flex px-5 items-center justify-center gap-4 z-10'>
                <InputEmoji value={text} onChange={setText} cleanOnEnter placeholder='Type a message...'/>
                <button onClick={handleButtonClick}><BsFillSendFill className=' text-blue-600 text-3xl'/></button>
              </div>
            </div>
         
        </div>
        <Link to='/'>
            <p className='cursor-pointer bg-slate-200 h-fit p-1 rounded-full'><MdClose /></p>
        </Link>
      </div>
    </div>
  )
}
