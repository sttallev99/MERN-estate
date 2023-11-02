import { useDispatch } from 'react-redux';

import { useFetchRecipientOfferDetails } from '../../hooks/useFetchRecipientOfferDetails';
import { modifyString } from '../../utils/modifyString';
import { selectChat, selectListing } from '../../redux/chat/chatSlice';


export default function UserChatCard({chat, user}) {
  const listing = useFetchRecipientOfferDetails(chat.listingId);

  const dispatch = useDispatch();

  return (
    listing && <div className='bg-slate-100 m-6 h-16 rounded-lg cursor-pointer flex' onClick={() => {
      dispatch(selectChat(chat));
      dispatch(selectListing(listing));
    }}>
        <div className='flex items-center relative'>
            <img 
            src={listing.imageUrls[0]}
            alt=""
            className='w-12 h-12 rounded-full mx-2 p-1' 
            />
            <p className='bg-green-500 w-3 h-3 absolute top-3 right-0 rounded-full'></p>
        </div>
        <div className='w-full m-2'>
            <div className='flex justify-between pl-2'>
                <p className='font-medium'>{modifyString(listing.name)}</p>
                <p className='text-sm'>24/12/2023</p>
            </div>
            <p className='pl-2'>example text message</p>
        </div>
    </div>
  )
}
