import React from 'react'
import { useSelector } from 'react-redux'

export default function Message({message}) {
  const currentUser = useSelector(state => state.user.currentUser);
  return (
    <>
        <div className={`${currentUser._id === message.senderId ? 'my-chat' : 'client-chat'} bg-slate-300 my-5`}>{message.text}</div>
    </>
  )
}
