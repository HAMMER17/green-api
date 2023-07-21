import React, { useContext, useState, useEffect } from 'react'
import { collection, query, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase/config'
import { AuthContext } from '../context/AuthContext'
import '../style/mypage.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/user';

const MyPage = () => {
  const [userData, setUserData] = useState([])
  const { currentUser } = useContext(AuthContext)
  const state = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const comeBack = () => {
    navigate('/')
  }
  useEffect(() => {
    const getUser = async () => {
      const q = query(collection(db, 'users'))
      const querySnapshot = await getDocs(q);
      const arr = []
      querySnapshot.forEach((doc) => {
        if (doc.data().id === currentUser.uid) {
          return
        } else
          arr.push(doc.data())
      })
      setUserData(arr)
    }
    getUser()
  }, [currentUser.uid])

  const chatUser = async (data) => {
    const comdinedId = currentUser.uid > state.id ? currentUser.uid + state.id : state.id + currentUser.uid
    try {
      const res = await getDoc(doc(db, "private", comdinedId))
      if (!res.exists()) {
        await setDoc(doc(db, "private", comdinedId), { messages: [] });
        dispatch(getUserData(data))
        navigate('/private')
      } else {
        dispatch(getUserData(data))
        navigate('/private')
      }
    } catch (error) {
      console.log(error)
    }


  }
  return (
    <div className='my_page'>
      <button className='my_button' onClick={comeBack}>come back</button>
      <h1>I am {currentUser.displayName}</h1>
      <img src={currentUser.photoURL} alt="currentUser" />
      <h3>{currentUser.time}</h3>
      <h3>{currentUser.email}</h3>
      <h2 >You could write to them in private chat</h2>
      <div className="my_page_img">
        {userData.map(elem => (
          <img key={Math.random()} onClick={() => chatUser(elem)} src={elem.photoURL} alt="page" />
        ))}
      </div>

    </div>
  )
}

export default MyPage
