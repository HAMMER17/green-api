import React, { useEffect, useState } from 'react'
import '../style/user.css'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData } from '../redux/user';

import { RotatingLines } from 'react-loader-spinner'

const UserPage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUser() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const arr = []
      querySnapshot.forEach((doc) => {
        arr.push(doc.data())

      });
      setUserData(arr)
      setLoader(false)
    }
    getUser()
  }, [])
  const userId = (elem) => {

    navigate(`/${elem.id}`)
    dispatch(getUserData(elem))

  }

  return (
    <div className='user_page' >

      {loader ? (<div style={{ margin: 150 }}> <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      /></div>) : userData.map((elem, i) => (
        <div key={Math.random()} className='user_elem' onClick={() => userId(elem)}>
          <h3>{elem?.displayName}</h3>
          <div className="user_img">
            <img src={elem?.photoURL} alt="username" />
            <p className="user_sms">{elem.id ? userData[i].messages?.at(-1).text : ''}.... </p>
            <p style={{ marginLeft: 50, fontStyle: 'italic', color: 'gray' }}>{userData[i].messages?.at(-1).time}</p>
          </div>

        </div>
      ))}
    </div>
  )
}

export default UserPage
