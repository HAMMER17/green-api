import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from '../firebase/config';
import { MdAddAPhoto } from 'react-icons/md'
import '../style/auth.css'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    const displayName = e.target[2].value
    const file = e.target[3].files[0]
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, 'images/' + file.name);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(result.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", result.user.uid), {
              id: result.user.uid,
              email,
              displayName,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "private", result.user.uid), { messages: [] });
            // await setDoc(doc(db, 'chats', result.user.uid), {})
            navigate('/')
          } catch (error) {
            console.log(error)
          }
          console.log('File available at', downloadURL)
        });
      })
    } catch (error) {
      console.log(error)
    }
  }
  const signIn = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {show ? <form className='register' onSubmit={handlerSubmit}>
        <h2>Авторизация</h2>

        <input type="text" placeholder='Email...' />
        <input type="text" placeholder='Password...' />
        <input type="text" placeholder='Name...' />
        <input type="file" id='file' style={{ display: 'none' }} />
        <label htmlFor="file">
          <MdAddAPhoto size={30} style={{ cursor: 'pointer' }} />
        </label>
        <button>sign up</button>
        <p>Есть аккаунт? <span style={{ cursor: 'pointer', marginLeft: 30, fontStyle: 'italic', color: 'red', fontSize: 20 }} onClick={() => setShow(!show)}> Login</span></p>
      </form> : <form className='register' onSubmit={signIn}>
        <h2>Войти</h2>

        <input type="text" placeholder='Email...' />
        <input type="text" placeholder='Password...' />

        <button>sign in</button>
        <p>Нет регистрации? <span style={{ cursor: 'pointer', marginLeft: 30, fontStyle: 'italic', color: 'red', fontSize: 20 }} onClick={() => setShow(!show)}> Register</span></p>
      </form>}
    </>
  )
}

export default Auth
