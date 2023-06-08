import React, { useState } from 'react'
import '../style/sidebar.css'
import Users from './Users'
import { useDispatch } from 'react-redux'
import { getNumber } from '../redux/dataUser'

const SideBar = () => {
  const dispatch = useDispatch()


  const [phone, setPhone] = useState('')
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)

  const getPhone = () => {
    dispatch(getNumber(phone))
    setValue(phone)
    setShow(true)
  }

  const addPhone = (e) => {
    e.code === 'Enter' && getPhone()

  }

  return (
    <>
      <div className='sidebar_container'>
        <div className='sidebar'>
          <div className='sidebar_user'>
            <div className='sidebar_flex'>
              <img src="https://media.istockphoto.com/id/1322775684/photo/tiger-portrait.jpg?s=170667a&w=0&k=20&c=FRvrqZrrwMBMjkmZoOFOk8ai_P4lBxEXQ8wlQ1nBdRc=" alt="avatar" />
              <p>{value}</p>
            </div>
            <div>
              {show ? <button onClick={() => setShow(!show)}>введите номер телефона</button> :
                <input type="text" placeholder='number...' onKeyDown={addPhone} onChange={(e) => setPhone(e.target.value)} />}
            </div>
            <div>

            </div>
          </div>
          <Users phone={value} />
        </div>
      </div>

    </>
  )
}

export default SideBar
