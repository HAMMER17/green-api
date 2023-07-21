import React, { useContext, useState } from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { AuthContext } from '../context/AuthContext'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, arrayUnion, collection, addDoc } from "firebase/firestore";
import { storage, db } from '../firebase/config';
// import moment from 'moment';
// import { ChatContext } from '../context/ChatContext';

const Input = () => {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const data = useSelector(state => state.user.value)
  const { currentUser } = useContext(AuthContext)
  // const { data } = useContext(ChatContext)

  const addMessage = async () => {
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


    if (file) {
      const storageRef = ref(storage, 'chats/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default: break;
          }
        },

        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
            default: break;
          }
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            await addDoc(collection(db, "chats"), {
              id: currentUser.uid,
              img: downloadURL,
              text,
              chatId: data.id,
              photoURL: currentUser.photoURL,
              displayName: currentUser.displayName,
              time: formatter.format(date),
            });

            await updateDoc(doc(db, 'users', currentUser.uid), {
              messages: arrayUnion({
                text,
                time: formatter.format(date),
              })
            })
            console.log('File available at', downloadURL);
          });
        }
      );
    } else {
      await addDoc(collection(db, "chats"), {
        id: currentUser.uid,
        text,
        chatId: data.id,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
        time: formatter.format(date),
      });
      await updateDoc(doc(db, 'users', currentUser.uid), {
        messages: arrayUnion({
          text,
          time: formatter.format(date),
        })
      })
    }
    setText('')
    setFile(null)
  }
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', justifyContent: 'space-between', width: "100%", alignItems: 'center' }}>
      <input value={text} type="text" placeholder='Message...' onChange={(e) => setText(e.target.value)} />
      <input type="file" id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
      <label htmlFor="file">
        <MdAddAPhoto size={30} style={{ cursor: 'pointer', marginRight: 30 }} />
      </label>
      <button style={{ width: '50%', margin: 10 }} onClick={addMessage}>message...</button>
    </form>
  )
}

export default Input
