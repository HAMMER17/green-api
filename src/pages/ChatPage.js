import React, { useEffect, useRef, useState } from 'react'
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from '../firebase/config';
import '../style/chat.css'

// import { AuthContext } from '../context/AuthContext'

import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner'

const ChatPage = () => {
  const [chat, setChat] = useState([])
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  const data = useSelector(state => state.user.value)
  // const { currentUser } = useContext(AuthContext)

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const q = query(collection(db, "chats"), where('chatId', '==', data.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setChat(arr)
      setLoader(false)
    });
    return () => unsubscribe()
  }, [data.id])

  return (
    <div className='chat'>
      <button onClick={() => navigate('/')}>come back</button>
      <div className="chat_container">
        {loader ? (<div style={{ margin: 50 }}> <RotatingLines
          strokeColor="red"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        /></div>) : chat.map(el => (
          <div ref={scrollRef} className={data.id !== el.id ? "chat_right" : "chat_left"} key={Math.random()} >
            <div className='chat_img_user'>
              <img className='chat_img' src={el.photoURL} alt="" />
              <h3>{el.displayName}</h3>
            </div>
            <div className={el.id === data.id ? 'chat_left_div' : 'chat_div'}>
              <p >{el.text}</p>
            </div>
            <img className='chat_post_img' src={el.img} alt='' />
            <p style={{ color: 'white', fontStyle: 'italic' }}>{el.time}</p>
          </div>
        ))}
      </div>
      <footer>
        <Input />
      </footer>
    </div>
  )
}

export default ChatPage
