import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createAndGetChat } from '../redux/chat/chatSlice';

export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const currentUser = useSelector(state => state.user.currentUser);
  const chatsStatus = useSelector(state => state.chat.status);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLandlord = async () => {
      try{
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      }catch(err){
        console.log(err);
      }
    }
    
    fetchLandlord();
  },[listing.userRef]);
  
  
  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if(chatsStatus === 'idle') {
      dispatch(createAndGetChat({firstId: currentUser._id, secondId: listing.userRef, listingId: listing._id}));
    }
  }

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-4'>
          <p>Contact <span className='font-semibold'>{landlord.username}</span> for 
          <span className='font-semibold'> {listing.name.toLowerCase()}</span></p>
          {/* <textarea 
            name='message' 
            id='message' 
            rows={2} 
            value={message} 
            onChange={handleChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          />
          <Link 
          to={`mailto:${landlord.email}?subject=Regarfing${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >Send Mail</Link> */}
          <textarea 
            name='message' 
            id='message' 
            rows={2} 
            value={message} 
            onChange={handleChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          />
          <Link 
          to='/messages'
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          onClick={handleSendMessage}
          >Send Message</Link>
        </div>
      )}
    </>
  )
}
