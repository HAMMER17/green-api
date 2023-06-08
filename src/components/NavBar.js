import React, { useEffect, useState } from 'react'
import '../style/navbar.css'
import Input from './Input'
import { useSelector } from 'react-redux'
import axios from 'axios'

const NavBar = () => {
  const [text, setText] = useState('')
  const [value, setValue] = useState([])
  const state = useSelector(state => state.user.value)
  const param = useSelector(state => state.user.phone)

  let data = JSON.stringify({
    "chatId": `${param}@c.us`,
    "message": text,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://api.green-api.com/waInstance${state.instance}/sendMessage/${state.token}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  const postSend = () => {
    axios.request(config)
      .then((response) => {
        console.log((response.data));
        setText('')
      })
      .catch((error) => {
        console.log(error);
      });
  }
  let config2 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.green-api.com/waInstance${state.instance}/lastOutgoingMessages/${state.token}`,
    headers: {}
  };

  const getPost = () => {
    axios.request(config2)
      .then((response) => {
        setValue(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getPost()
    // eslint-disable-next-line
  }, [value])
  console.log(value)
  return (
    <div className='navbar'>
      <div className='navbar_user'>
        {/* <img src="https://www.nme.com/wp-content/uploads/2017/03/2017Stephen-King-IT-new-picture.jpg" alt="ava" /> */}
        <div className='user_text'>{param}</div>
      </div>
      <div className='navbar_chat'>

        {value.map((el) => (
          <div key={el.idMessage}>
            <img src="https://www.nme.com/wp-content/uploads/2017/03/2017Stephen-King-IT-new-picture.jpg" alt="ava" />
            <div className='user_text'>{el.textMessage}</div>
          </div>
        ))}

      </div>
      <div className='navbar_chat_right'>
        <div style={{ background: 'blue' }} className='user_text'>text text</div>
        <img src="https://media.istockphoto.com/id/1322775684/photo/tiger-portrait.jpg?s=170667a&w=0&k=20&c=FRvrqZrrwMBMjkmZoOFOk8ai_P4lBxEXQ8wlQ1nBdRc=" alt="avatar" />

      </div>
      <footer>
        <Input isSubmit={postSend} text={(e) => setText(e.target.value)} item={text} />
      </footer>

    </div>
  )
}

export default NavBar
