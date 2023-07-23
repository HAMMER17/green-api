import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from '../context/AuthContext'
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";

import { db } from '../firebase/config'
import '../style/private.css'
import { useNavigate } from 'react-router-dom';


const PrivateChat = () => {
  const navigate = useNavigate()
  const [userText, setUserText] = useState([])
  const [messages, setMessages] = useState([])
  const state = useSelector(state => state.user.value)
  const { currentUser } = useContext(AuthContext)

  let date = new Date();
  let formatter = new Intl.DateTimeFormat("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const combinedId =
    currentUser.uid > state.id ? currentUser.uid + state.id : state.id + currentUser.uid;
  const userSend = async () => {
    try {
      await updateDoc(doc(db, "private", combinedId), {
        messages: arrayUnion({
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          userName: state.displayName,
          userText,
          date: formatter.format(date),
        })
      })
      setUserText('')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    onSnapshot(doc(db, "private", combinedId), (doc) => {
      setMessages(doc.data()?.messages)

    });
  }, [currentUser.uid, combinedId])

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // console.log(messages)
  return (
    <div className='private'>
      <button style={{ background: 'red', border: 'none' }} onClick={() => navigate('/my')}>come back</button>
      <div className="private_chat">
        {messages?.map(el => (

          <div ref={scrollRef} key={Math.random()} className={el.userId === currentUser.uid ? "private_user_chat" : "private_user_chat_right"} style={{ color: 'white' }}>
            <h3>{currentUser.uid === el.userId ? currentUser.displayName : el.displayName}</h3>
            <p >{el.userText}</p>
            {/* <span>{el?.date}</span> */}
          </div>

        ))}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder='Message...' value={userText} onChange={(e) => setUserText(e.target.value)} />
        <button onClick={userSend}>send</button>
      </form>
    </div>
  )
}

export default PrivateChat
