import { MdClose } from 'react-icons/md';

import UserChatCard from '../components/chat/UserChatCard'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserChats } from '../redux/chat/chatSlice';

export default function Messages() {
  const chats = useSelector(state => state.chat.chats);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if(chats === null && currentUser) {
      dispatch(getUserChats(currentUser._id));
    }
  }, [chats, dispatch])
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
                <img 
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75IBxhzh2Rw3Saoqocq0nvzn_GP3NH0CQCA&usqp=CAU' 
                    alt=""
                    className='w-14 h-auto rounded-full mx-5'
                />
                <p className='font-semibold text-xl'>Listing name</p>
            </div>
            <div className='bg-slate-100 w-full h-[calc(100%-64px)] rounded-lg mt-2'>

            </div>
        </div>
        <Link to='/'>
            <p className='cursor-pointer bg-slate-200 h-fit p-1 rounded-full'><MdClose /></p>
        </Link>
      </div>
    </div>
  )
}
